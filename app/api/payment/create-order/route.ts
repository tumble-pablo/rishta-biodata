import { env } from "cloudflare:workers";

import { UNLOCK_PRICE_INR } from "@/lib/biodata/payment";

// Creates a real Razorpay order. The amount is this server's own fixed
// constant, never a value the client sends — accepting a client-supplied
// amount here would let a tampered request create a cheaper order.
export async function POST() {
  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return Response.json(
      { error: "Payment isn't configured yet. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 500 }
    );
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
        receipt: `biodata_${Date.now()}`,
      }),
    });
  } catch (error) {
    console.error("[razorpay] create-order request failed", error);
    return Response.json({ error: "Could not reach the payment provider." }, { status: 502 });
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[razorpay] create-order failed", response.status, detail);
    return Response.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }

  const order = (await response.json()) as { id: string; amount: number; currency: string };

  return Response.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    // Safe to return — the Key ID is meant to be used client-side by
    // Razorpay Checkout. The secret never leaves this route.
    keyId,
  });
}
