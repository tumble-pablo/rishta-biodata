import { env } from "cloudflare:workers";

import {
  enforceRateLimit,
  getCookie,
  isJsonRequest,
  isSameOriginRequest,
  jsonNoStore,
  readJsonBody,
} from "@/lib/server/http-security";
import { ENTITLEMENT_COOKIE, verifyEntitlementToken } from "@/lib/server/payment-session";

interface SendBackupRequestBody {
  email: string;
  pdfBase64: string;
}

const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,63}$/u;

// Generous but not unbounded — these are single-page, JPEG-compressed A4
// documents (see pdf-export.ts), so a legitimate one is a few hundred KB to
// a couple MB. Base64 inflates size by ~33%, so this caps the *decoded*
// attachment around 12MB, well above anything the real export produces.
const MAX_BASE64_LENGTH = 12_000_000;
const MAX_REQUEST_BYTES = MAX_BASE64_LENGTH + 2_048;
const PROVIDER_TIMEOUT_MS = 10_000;

function parseRequestBody(value: unknown): SendBackupRequestBody | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (typeof body.email !== "string" || typeof body.pdfBase64 !== "string") return null;

  const email = body.email.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return null;
  if (
    body.pdfBase64.length === 0 ||
    body.pdfBase64.length > MAX_BASE64_LENGTH ||
    body.pdfBase64.length % 4 !== 0 ||
    !body.pdfBase64.startsWith("JVBERi0")
  ) {
    return null;
  }
  return { email, pdfBase64: body.pdfBase64 };
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonNoStore({ success: false, error: "Cross-origin requests are not allowed." }, { status: 403 });
  }
  if (!isJsonRequest(request)) {
    return jsonNoStore({ success: false, error: "Content-Type must be application/json." }, { status: 415 });
  }

  const apiKey = env.RESEND_API_KEY;
  const sessionSecret = env.PAYMENT_SESSION_SECRET || env.RAZORPAY_KEY_SECRET;
  if (!apiKey || !sessionSecret) {
    console.error(JSON.stringify({ event: "email_configuration_missing" }));
    return jsonNoStore({ success: false, error: "Email delivery is temporarily unavailable." }, { status: 503 });
  }

  const entitlementToken = getCookie(request, ENTITLEMENT_COOKIE);
  const entitlement = entitlementToken
    ? await verifyEntitlementToken(entitlementToken, sessionSecret)
    : null;
  if (!entitlement) {
    return jsonNoStore({ success: false, error: "A verified payment is required." }, { status: 401 });
  }

  const rateLimit = await enforceRateLimit(
    env.EMAIL_RATE_LIMITER,
    request,
    "email-backup",
    entitlement.paymentId
  );
  if (rateLimit === "limited") {
    return jsonNoStore(
      { success: false, error: "Too many email attempts. Please wait and try again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }
  if (rateLimit === "unavailable") {
    console.error(JSON.stringify({ event: "email_rate_limiter_unavailable" }));
    return jsonNoStore({ success: false, error: "Email delivery is temporarily unavailable." }, { status: 503 });
  }

  const rawBody = await readJsonBody(request, MAX_REQUEST_BYTES);
  if (!rawBody.ok) {
    return jsonNoStore(
      { success: false, error: rawBody.status === 413 ? "PDF is too large." : "Invalid request body." },
      { status: rawBody.status }
    );
  }
  const body = parseRequestBody(rawBody.value);
  if (!body) return jsonNoStore({ success: false, error: "A valid email and PDF are required." }, { status: 400 });
  if (!entitlement.email || body.email !== entitlement.email) {
    return jsonNoStore(
      { success: false, error: "The backup can only be sent to the payment email." },
      { status: 403 }
    );
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rishta Biodata <biodata@rishtabiodata.com>",
        to: [body.email],
        subject: "Your Rishta Biodata backup copy",
        html: "<p>Here's a backup copy of your biodata, attached as a PDF — keep it handy in case a download ever fails.</p>",
        attachments: [
          {
            // This constant prevents header/filename injection from request data.
            filename: "biodata.pdf",
            content: body.pdfBase64,
          },
        ],
      }),
      signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "resend_send_backup_request_failed",
        error: error instanceof Error ? error.message : "unknown",
      })
    );
    return jsonNoStore({ success: false, error: "Could not reach the email provider." }, { status: 502 });
  }

  if (!response.ok) {
    await response.body?.cancel();
    console.error(JSON.stringify({ event: "resend_send_backup_failed", status: response.status }));
    return jsonNoStore({ success: false, error: "Could not send the backup email." }, { status: 502 });
  }

  await response.body?.cancel();
  return jsonNoStore({ success: true });
}
