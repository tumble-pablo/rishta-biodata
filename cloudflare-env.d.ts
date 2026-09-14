declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    /** Public — safe to return to the client for Razorpay Checkout. */
    RAZORPAY_KEY_ID?: string;
    /** Server-only. Never send this to the client. */
    RAZORPAY_KEY_SECRET?: string;
    /** Server-only. Never send this to the client. */
    RESEND_API_KEY?: string;
  }
}
