export const PENDING_PAYMENT_COOKIE = "rishta_payment_pending";
export const ENTITLEMENT_COOKIE = "rishta_payment_entitlement";

const TOKEN_VERSION = 1;
const TOKEN_CONTEXT = "rishta-payment-session-v1";
const PENDING_TTL_SECONDS = 15 * 60;
const ENTITLEMENT_TTL_SECONDS = 365 * 24 * 60 * 60;

const ORDER_ID_PATTERN = /^order_[A-Za-z0-9]{8,64}$/;
const PAYMENT_ID_PATTERN = /^pay_[A-Za-z0-9]{8,64}$/;
const HEX_SIGNATURE_PATTERN = /^[a-f0-9]{64}$/;

export interface PendingPaymentSession {
  v: 1;
  type: "pending";
  orderId: string;
  exp: number;
}

export interface PaymentEntitlement {
  v: 1;
  type: "entitlement";
  orderId: string;
  paymentId: string;
  email: string | null;
  issuedAt: number;
  exp: number;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function base64UrlToBytes(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/u.test(value)) return null;
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  try {
    const binary = atob(padded);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    return null;
  }
}

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, value: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return bytesToHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

/** Hashes both inputs to a fixed length before a constant-time comparison. */
export async function secureEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [aHash, bHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const subtle = crypto.subtle as SubtleCrypto & {
    timingSafeEqual?: (left: ArrayBuffer, right: ArrayBuffer) => boolean;
  };
  if (typeof subtle.timingSafeEqual === "function") return subtle.timingSafeEqual(aHash, bHash);

  const left = new Uint8Array(aHash);
  const right = new Uint8Array(bHash);
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left[index] ^ right[index];
  return mismatch === 0;
}

async function signPayload(payload: PendingPaymentSession | PaymentEntitlement, secret: string): Promise<string> {
  const encoded = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await hmacHex(secret, `${TOKEN_CONTEXT}.${encoded}`);
  return `${encoded}.${signature}`;
}

function isPendingPaymentSession(value: unknown): value is PendingPaymentSession {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    candidate.v === TOKEN_VERSION &&
    candidate.type === "pending" &&
    typeof candidate.orderId === "string" &&
    ORDER_ID_PATTERN.test(candidate.orderId) &&
    typeof candidate.exp === "number" &&
    Number.isSafeInteger(candidate.exp)
  );
}

function isPaymentEntitlement(value: unknown): value is PaymentEntitlement {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    candidate.v === TOKEN_VERSION &&
    candidate.type === "entitlement" &&
    typeof candidate.orderId === "string" &&
    ORDER_ID_PATTERN.test(candidate.orderId) &&
    typeof candidate.paymentId === "string" &&
    PAYMENT_ID_PATTERN.test(candidate.paymentId) &&
    (candidate.email === null ||
      (typeof candidate.email === "string" && candidate.email.length <= 254 && candidate.email.includes("@"))) &&
    typeof candidate.issuedAt === "number" &&
    Number.isSafeInteger(candidate.issuedAt) &&
    typeof candidate.exp === "number" &&
    Number.isSafeInteger(candidate.exp)
  );
}

async function verifyTokenPayload(token: string, secret: string): Promise<unknown | null> {
  if (token.length > 2048) return null;
  const parts = token.split(".");
  if (parts.length !== 2 || !HEX_SIGNATURE_PATTERN.test(parts[1])) return null;

  const expected = await hmacHex(secret, `${TOKEN_CONTEXT}.${parts[0]}`);
  if (!(await secureEqual(parts[1], expected))) return null;

  const payloadBytes = base64UrlToBytes(parts[0]);
  if (!payloadBytes) return null;
  try {
    return JSON.parse(new TextDecoder().decode(payloadBytes)) as unknown;
  } catch {
    return null;
  }
}

export async function createPendingPaymentToken(
  orderId: string,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): Promise<string> {
  if (!ORDER_ID_PATTERN.test(orderId)) throw new Error("Invalid Razorpay order id.");
  return signPayload(
    { v: TOKEN_VERSION, type: "pending", orderId, exp: nowSeconds + PENDING_TTL_SECONDS },
    secret
  );
}

export async function verifyPendingPaymentToken(
  token: string,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): Promise<PendingPaymentSession | null> {
  const payload = await verifyTokenPayload(token, secret);
  return isPendingPaymentSession(payload) && payload.exp > nowSeconds ? payload : null;
}

export async function createEntitlementToken(
  orderId: string,
  paymentId: string,
  secret: string,
  email: string | null = null,
  nowSeconds = Math.floor(Date.now() / 1000)
): Promise<string> {
  if (!ORDER_ID_PATTERN.test(orderId) || !PAYMENT_ID_PATTERN.test(paymentId)) {
    throw new Error("Invalid Razorpay payment reference.");
  }
  return signPayload(
    {
      v: TOKEN_VERSION,
      type: "entitlement",
      orderId,
      paymentId,
      email: email?.trim().toLowerCase() || null,
      issuedAt: nowSeconds,
      exp: nowSeconds + ENTITLEMENT_TTL_SECONDS,
    },
    secret
  );
}

export async function verifyEntitlementToken(
  token: string,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): Promise<PaymentEntitlement | null> {
  const payload = await verifyTokenPayload(token, secret);
  return isPaymentEntitlement(payload) && payload.exp > nowSeconds && payload.issuedAt <= nowSeconds + 60
    ? payload
    : null;
}

export function pendingCookieMaxAge(): number {
  return PENDING_TTL_SECONDS;
}

export function entitlementCookieMaxAge(): number {
  return ENTITLEMENT_TTL_SECONDS;
}

export function isRazorpayOrderId(value: unknown): value is string {
  return typeof value === "string" && ORDER_ID_PATTERN.test(value);
}

export function isRazorpayPaymentId(value: unknown): value is string {
  return typeof value === "string" && PAYMENT_ID_PATTERN.test(value);
}

export function isRazorpaySignature(value: unknown): value is string {
  return typeof value === "string" && HEX_SIGNATURE_PATTERN.test(value);
}
