import {
  isRazorpayOrderId,
  isRazorpayPaymentId,
  isRazorpaySignature,
} from "./payment-session.ts";

export interface VerifyRequestBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export function parseVerifyRequest(value: unknown): VerifyRequestBody | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (
    Object.keys(body).some(
      (key) => !["razorpay_order_id", "razorpay_payment_id", "razorpay_signature"].includes(key)
    )
  ) {
    return null;
  }
  if (
    !isRazorpayOrderId(body.razorpay_order_id) ||
    !isRazorpayPaymentId(body.razorpay_payment_id) ||
    !isRazorpaySignature(body.razorpay_signature)
  ) {
    return null;
  }
  return {
    razorpay_order_id: body.razorpay_order_id,
    razorpay_payment_id: body.razorpay_payment_id,
    razorpay_signature: body.razorpay_signature,
  };
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: "INR";
  status: "created";
}

export function isExpectedOrder(value: unknown, amount: number): value is RazorpayOrder {
  if (!value || typeof value !== "object") return false;
  const order = value as Record<string, unknown>;
  return (
    isRazorpayOrderId(order.id) &&
    order.amount === amount &&
    order.currency === "INR" &&
    order.status === "created"
  );
}

export interface RazorpayCapturedPayment {
  id: string;
  order_id: string;
  amount: number;
  currency: "INR";
  status: "captured";
  captured: true;
  amount_refunded: 0;
  email?: unknown;
}

export function normalizeProviderEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email) ? email : null;
}

export function isExpectedCapturedPayment(
  value: unknown,
  paymentId: string,
  orderId: string,
  amount: number
): value is RazorpayCapturedPayment {
  if (!value || typeof value !== "object") return false;
  const payment = value as Record<string, unknown>;
  return (
    payment.id === paymentId &&
    payment.order_id === orderId &&
    payment.amount === amount &&
    payment.currency === "INR" &&
    payment.status === "captured" &&
    payment.captured === true &&
    payment.amount_refunded === 0
  );
}
