import { env } from "cloudflare:workers";

import { UNLOCK_PRICE_INR } from "@/lib/biodata/payment-config";
import {
  enforceRateLimit,
  getCookie,
  isJsonRequest,
  isSameOriginRequest,
  jsonNoStore,
  readJsonBody,
  readJsonResponse,
  requestUsesHttps,
  serializeCookie,
} from "@/lib/server/http-security";
import {
  createEntitlementToken,
  ENTITLEMENT_COOKIE,
  entitlementCookieMaxAge,
  PENDING_PAYMENT_COOKIE,
  secureEqual,
  verifyPendingPaymentToken,
} from "@/lib/server/payment-session";
import {
  isExpectedCapturedPayment,
  normalizeProviderEmail,
  parseVerifyRequest,
} from "@/lib/server/razorpay-validation";

const REQUEST_LIMIT_BYTES = 4_096;
const PROVIDER_RESPONSE_LIMIT_BYTES = 32_768;
const PROVIDER_TIMEOUT_MS = 8_000;

// Razorpay signs `order_id|payment_id` with HMAC-SHA256 using the account's
// key secret. Recomputing that signature server-side (using the secret,
// never sent to the client) and comparing it to what the client reports is
// what actually proves a payment happened — the client alone can't forge a
// valid signature without the secret. Uses Web Crypto (`crypto.subtle`),
// available natively in the Cloudflare Workers runtime — no Node crypto
// module needed.
async function computeSignatureHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonNoStore({ verified: false, error: "Cross-origin requests are not allowed." }, { status: 403 });
  }
  if (!isJsonRequest(request)) {
    return jsonNoStore({ verified: false, error: "Content-Type must be application/json." }, { status: 415 });
  }

  const rawBody = await readJsonBody(request, REQUEST_LIMIT_BYTES);
  if (!rawBody.ok) {
    return jsonNoStore(
      { verified: false, error: rawBody.status === 413 ? "Request body is too large." : "Invalid request body." },
      { status: rawBody.status }
    );
  }
  const body = parseVerifyRequest(rawBody.value);
  if (!body) return jsonNoStore({ verified: false, error: "Invalid payment details." }, { status: 400 });

  const rateLimit = await enforceRateLimit(
    env.PAYMENT_VERIFY_RATE_LIMITER,
    request,
    "payment-verify"
  );
  if (rateLimit === "limited") {
    return jsonNoStore(
      { verified: false, error: "Too many verification attempts. Please wait and try again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }
  if (rateLimit === "unavailable") {
    console.error(JSON.stringify({ event: "payment_verify_rate_limiter_unavailable" }));
    return jsonNoStore({ verified: false, error: "Payment verification is temporarily unavailable." }, { status: 503 });
  }

  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    console.error(JSON.stringify({ event: "payment_configuration_missing" }));
    return jsonNoStore({ verified: false, error: "Payment verification is temporarily unavailable." }, { status: 503 });
  }

  const sessionSecret = env.PAYMENT_SESSION_SECRET || keySecret;
  const pendingCookie = getCookie(request, PENDING_PAYMENT_COOKIE);
  const pendingSession = pendingCookie
    ? await verifyPendingPaymentToken(pendingCookie, sessionSecret)
    : null;
  if (!pendingSession || pendingSession.orderId !== body.razorpay_order_id) {
    return jsonNoStore({ verified: false, error: "Payment session is missing or expired." }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const expectedSignature = await computeSignatureHex(
    keySecret,
    `${razorpay_order_id}|${razorpay_payment_id}`
  );
  if (!(await secureEqual(expectedSignature, razorpay_signature))) {
    console.warn(JSON.stringify({ event: "razorpay_signature_mismatch" }));
    return jsonNoStore({ verified: false, error: "Payment verification failed." }, { status: 400 });
  }

  let providerResponse: Response;
  try {
    providerResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(razorpay_payment_id)}`,
      {
        headers: { Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}` },
        signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
      }
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "razorpay_fetch_payment_request_failed",
        error: error instanceof Error ? error.message : "unknown",
      })
    );
    return jsonNoStore({ verified: false, error: "Could not confirm the payment." }, { status: 502 });
  }

  if (!providerResponse.ok) {
    await providerResponse.body?.cancel();
    console.error(JSON.stringify({ event: "razorpay_fetch_payment_failed", status: providerResponse.status }));
    return jsonNoStore({ verified: false, error: "Could not confirm the payment." }, { status: 502 });
  }

  const payment = await readJsonResponse(providerResponse, PROVIDER_RESPONSE_LIMIT_BYTES);
  if (!isExpectedCapturedPayment(payment, razorpay_payment_id, razorpay_order_id, UNLOCK_PRICE_INR * 100)) {
    console.warn(JSON.stringify({ event: "razorpay_payment_not_fulfillable" }));
    return jsonNoStore(
      { verified: false, error: "The payment is not captured for the expected amount." },
      { status: 409 }
    );
  }

  const backupEmail = normalizeProviderEmail(payment.email);
  const entitlement = await createEntitlementToken(
    razorpay_order_id,
    razorpay_payment_id,
    sessionSecret,
    backupEmail
  );
  const secure = requestUsesHttps(request);
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    serializeCookie(ENTITLEMENT_COOKIE, entitlement, {
      maxAge: entitlementCookieMaxAge(),
      path: "/",
      secure,
    })
  );
  headers.append(
    "Set-Cookie",
    serializeCookie(PENDING_PAYMENT_COOKIE, "", {
      maxAge: 0,
      path: "/api/payment",
      secure,
    })
  );
  return jsonNoStore({ verified: true, backupEmail }, { headers });
}
