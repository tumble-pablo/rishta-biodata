// Payment abstraction. `mockPaymentProvider` is the only implementation for
// now — it simulates a short processing delay then always succeeds, issuing
// a fake token. No real money moves and no real order is created; this is
// purely a UI/state placeholder, standing in for Razorpay until that's wired
// up (see the note below).
//
// Future Razorpay swap-in (not built here): a `razorpayPaymentProvider`
// implementing this same interface would need (a) a server route such as
// `app/api/payment/create-order/route.ts` using a server-only
// `RAZORPAY_KEY_SECRET` to create a real order, (b) the Razorpay Checkout
// script loaded via `next/script`, and (c) server-side signature
// verification of the payment response before trusting it. At that point
// "has paid" should stop being a trusted client localStorage flag (see
// `purchase-storage.ts`) and instead be re-confirmed against the server.

export const PLACEHOLDER_PRICE_INR = 51;

export interface CheckoutOptions {
  amountInPaise: number;
  description: string;
}

export interface CheckoutResult {
  success: boolean;
  token?: string;
}

export interface PaymentProvider {
  startCheckout(options: CheckoutOptions): Promise<CheckoutResult>;
}

function createFakeToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `mock_${crypto.randomUUID()}`;
  }
  return `mock_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export const mockPaymentProvider: PaymentProvider = {
  async startCheckout() {
    // Simulated processing delay so the UI's loading state is visible.
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { success: true, token: createFakeToken() };
  },
};
