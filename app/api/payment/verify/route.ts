import { env } from "cloudflare:workers";

interface VerifyRequestBody {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

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

// A plain `===` on the two hex strings would work functionally, but leaks a
// tiny timing signal about how many leading characters matched. Cheap to
// avoid, so this compares in constant time instead.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function POST(request: Request) {
  const keySecret = env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return Response.json({ verified: false, error: "Payment isn't configured yet." }, { status: 500 });
  }

  let body: VerifyRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ verified: false, error: "Invalid request body." }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return Response.json({ verified: false, error: "Missing payment details." }, { status: 400 });
  }

  const expectedSignature = await computeSignatureHex(
    keySecret,
    `${razorpay_order_id}|${razorpay_payment_id}`
  );
  const verified = timingSafeEqual(expectedSignature, razorpay_signature);

  if (!verified) {
    console.warn("[razorpay] signature mismatch for order", razorpay_order_id);
  }

  return Response.json({ verified, paymentId: verified ? razorpay_payment_id : undefined });
}
