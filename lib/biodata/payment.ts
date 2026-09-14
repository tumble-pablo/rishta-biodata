// Payment abstraction backing the "unlock full download" flow in
// step-review-download.tsx. `razorpayPaymentProvider` is the active
// implementation — see app/api/payment/create-order/route.ts and
// app/api/payment/verify/route.ts for the server side. `mockPaymentProvider`
// is kept around as an easy fallback (flip `ACTIVE_PAYMENT_PROVIDER` in
// biodata-builder.tsx) for testing when Razorpay credentials aren't set up
// locally yet.
//
// The price is enforced server-side, not by whatever the client sends: the
// create-order route reads this exact constant rather than trusting a
// request body amount, so a tampered client request can't create a
// cheaper order. `hasPaid` only flips to true after /api/payment/verify
// confirms Razorpay's HMAC signature — a real cryptographic check, not a
// client-side promise that always resolves the way the old mock did.

export const UNLOCK_PRICE_INR = 51;

export interface CheckoutOptions {
  description: string;
}

export interface CheckoutResult {
  success: boolean;
  token?: string;
}

export interface PaymentProvider {
  startCheckout(options: CheckoutOptions): Promise<CheckoutResult>;
}

interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

interface VerifyResponse {
  verified: boolean;
  paymentId?: string;
}

interface RazorpayHandlerResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutInstance {
  open(): void;
  on(event: "payment.failed", handler: () => void): void;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  theme?: { color?: string };
  handler: (response: RazorpayHandlerResponse) => void;
  modal?: { ondismiss?: () => void };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
  }
}

const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
let razorpayScriptPromise: Promise<void> | null = null;

function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay checkout can only load in the browser."));
  }
  if (window.Razorpay) return Promise.resolve();
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay checkout.")));
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      razorpayScriptPromise = null;
      reject(new Error("Failed to load Razorpay checkout."));
    };
    document.body.appendChild(script);
  });
  return razorpayScriptPromise;
}

export const razorpayPaymentProvider: PaymentProvider = {
  async startCheckout({ description }) {
    await loadRazorpayScript();

    const orderResponse = await fetch("/api/payment/create-order", { method: "POST" });
    if (!orderResponse.ok) return { success: false };
    const order = (await orderResponse.json()) as CreateOrderResponse;

    return new Promise((resolve) => {
      if (!window.Razorpay) {
        resolve({ success: false });
        return;
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Rishta Biodata",
        description,
        theme: { color: "#3e1532" },
        modal: {
          // The visitor closed the popup without paying — resolve (not
          // reject) so the UI just stays on the "pay to unlock" state.
          ondismiss: () => resolve({ success: false }),
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const result = (await verifyResponse.json()) as VerifyResponse;
            resolve({ success: result.verified, token: result.paymentId });
          } catch {
            resolve({ success: false });
          }
        },
      });
      checkout.on("payment.failed", () => resolve({ success: false }));
      checkout.open();
    });
  },
};

function createFakeToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `mock_${crypto.randomUUID()}`;
  }
  return `mock_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

/** Kept for local testing without Razorpay credentials configured — see
 * ACTIVE_PAYMENT_PROVIDER in biodata-builder.tsx. Always "succeeds" with a
 * fake token; no real money moves and no server call happens. */
export const mockPaymentProvider: PaymentProvider = {
  async startCheckout() {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { success: true, token: createFakeToken() };
  },
};
