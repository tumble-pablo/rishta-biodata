import { env } from "cloudflare:workers";

import { UNLOCK_PRICE_INR } from "@/lib/biodata/payment-config";
import {
  enforceRateLimit,
  isSameOriginRequest,
  jsonNoStore,
  readJsonResponse,
  requestUsesHttps,
  serializeCookie,
} from "@/lib/server/http-security";
import {
  createPendingPaymentToken,
  pendingCookieMaxAge,
  PENDING_PAYMENT_COOKIE,
} from "@/lib/server/payment-session";
import { isExpectedOrder } from "@/lib/server/razorpay-validation";

const PROVIDER_RESPONSE_LIMIT_BYTES = 16_384;
const PROVIDER_TIMEOUT_MS = 8_000;

// Creates a real Razorpay order. The amount is this server's own fixed
// constant, never a value the client sends — accepting a client-supplied
// amount here would let a tampered request create a cheaper order.
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonNoStore({ error: "Cross-origin requests are not allowed." }, { status: 403 });
  }

  const rateLimit = await enforceRateLimit(env.PAYMENT_ORDER_RATE_LIMITER, request, "payment-order");
  if (rateLimit === "limited") {
    return jsonNoStore(
      { error: "Too many payment attempts. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }
  if (rateLimit === "unavailable") {
    console.error(JSON.stringify({ event: "payment_order_rate_limiter_unavailable" }));
    return jsonNoStore({ error: "Payment is temporarily unavailable." }, { status: 503 });
  }

  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error(JSON.stringify({ event: "payment_configuration_missing" }));
    return jsonNoStore({ error: "Payment is temporarily unavailable." }, { status: 503 });
  }

  const amountInPaise = UNLOCK_PRICE_INR * 100;
  const auth = btoa(`${keyId}:${keySecret}`);

  let response: Response;
  try {
    response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: `biodata_${crypto.randomUUID()}`,
        partial_payment: false,
        notes: { product: "biodata_watermark_removal_v1" },
      }),
      signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "razorpay_create_order_request_failed",
        error: error instanceof Error ? error.message : "unknown",
      })
    );
    return jsonNoStore({ error: "Could not reach the payment provider." }, { status: 502 });
  }

  if (!response.ok) {
    await response.body?.cancel();
    console.error(JSON.stringify({ event: "razorpay_create_order_failed", status: response.status }));
    return jsonNoStore({ error: "Could not start payment. Please try again." }, { status: 502 });
  }

  const order = await readJsonResponse(response, PROVIDER_RESPONSE_LIMIT_BYTES);
  if (!isExpectedOrder(order, amountInPaise)) {
    console.error(JSON.stringify({ event: "razorpay_create_order_invalid_response" }));
    return jsonNoStore({ error: "Could not start payment. Please try again." }, { status: 502 });
  }

  const sessionSecret = env.PAYMENT_SESSION_SECRET || keySecret;
  const pendingToken = await createPendingPaymentToken(order.id, sessionSecret);
  const headers = new Headers({
    "Set-Cookie": serializeCookie(PENDING_PAYMENT_COOKIE, pendingToken, {
      maxAge: pendingCookieMaxAge(),
      path: "/api/payment",
      secure: requestUsesHttps(request),
    }),
  });

  return jsonNoStore(
    {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      // Safe to return — the Key ID is meant to be used client-side by
      // Razorpay Checkout. The secret never leaves this route.
      keyId,
    },
    { headers }
  );
}
