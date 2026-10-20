import { UNLOCK_PRICE_INR } from "@/lib/biodata/payment-config";

export { UNLOCK_PRICE_INR } from "@/lib/biodata/payment-config";

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

export interface CheckoutOptions {
  description: string;
  email?: string;
}

export interface CheckoutResult {
  success: boolean;
  cancelled?: boolean;
  error?: string;
  backupEmail?: string | null;
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
  error?: string;
  backupEmail?: string | null;
}

interface PaymentStatusResponse {
  hasPaid: boolean;
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
  prefill?: { email?: string };
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
  async startCheckout({ description, email }) {
    try {
      await loadRazorpayScript();
    } catch {
      return { success: false, error: "Payment checkout could not load. Check your connection and try again." };
    }

    let orderResponse: Response;
    try {
      orderResponse = await fetch("/api/payment/create-order", { method: "POST" });
    } catch {
      return { success: false, error: "Could not reach the payment service. Please try again." };
    }
    if (!orderResponse.ok) {
      const body = (await orderResponse.json().catch(() => null)) as { error?: string } | null;
      return { success: false, error: body?.error || "Could not start payment. Please try again." };
    }
    const order = (await orderResponse.json().catch(() => null)) as CreateOrderResponse | null;
    if (
      !order ||
      !order.orderId.startsWith("order_") ||
      order.amount !== UNLOCK_PRICE_INR * 100 ||
      order.currency !== "INR" ||
      !order.keyId
    ) {
      return { success: false, error: "The payment service returned an invalid order." };
    }

    return new Promise((resolve) => {
      if (!window.Razorpay) {
        resolve({ success: false, error: "Payment checkout could not load. Please try again." });
        return;
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Rishta Biodata",
        description,
        prefill: email ? { email } : undefined,
        theme: { color: "#3e1532" },
        modal: {
          // The visitor closed the popup without paying — resolve (not
          // reject) so the UI just stays on the "pay to unlock" state.
          ondismiss: () => resolve({ success: false, cancelled: true }),
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const result = (await verifyResponse.json().catch(() => null)) as VerifyResponse | null;
            resolve({
              success: verifyResponse.ok && result?.verified === true,
              backupEmail: result?.backupEmail,
              error:
                verifyResponse.ok && result?.verified === true
                  ? undefined
                  : result?.error || "We could not confirm the payment. Please contact support if you were charged.",
            });
          } catch {
            resolve({
              success: false,
              error: "We could not confirm the payment. Please contact support if you were charged.",
            });
          }
        },
      });
      checkout.on("payment.failed", () =>
        resolve({ success: false, error: "Payment failed. No unlock was applied; please try again." })
      );
      checkout.open();
    });
  },
};

export async function fetchPaymentStatus(): Promise<boolean> {
  try {
    const response = await fetch("/api/payment/status", {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
    });
    if (!response.ok) return false;
    const result = (await response.json()) as PaymentStatusResponse;
    return result.hasPaid === true;
  } catch {
    return false;
  }
}

/** Kept for local testing without Razorpay credentials configured — see
 * ACTIVE_PAYMENT_PROVIDER in biodata-builder.tsx. Always "succeeds" with a
 * local-only result; no real money moves and no server call happens. */
export const mockPaymentProvider: PaymentProvider = {
  async startCheckout() {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { success: true };
  },
};
