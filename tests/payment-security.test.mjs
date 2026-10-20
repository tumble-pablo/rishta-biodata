import assert from "node:assert/strict";
import test from "node:test";

import nextConfig from "../next.config.ts";
import {
  createEntitlementToken,
  createPendingPaymentToken,
  secureEqual,
  verifyEntitlementToken,
  verifyPendingPaymentToken,
} from "../lib/server/payment-session.ts";
import {
  enforceRateLimit,
  isSameOriginRequest,
  jsonNoStore,
  readJsonBody,
  serializeCookie,
} from "../lib/server/http-security.ts";
import {
  isExpectedCapturedPayment,
  isExpectedOrder,
  normalizeProviderEmail,
  parseVerifyRequest,
} from "../lib/server/razorpay-validation.ts";

const SECRET = "test-session-secret-with-enough-entropy";
const ORDER_ID = "order_AbCdEf123456";
const PAYMENT_ID = "pay_AbCdEf123456";
const SIGNATURE = "a".repeat(64);

test("pending payment tokens are signed, scoped, and expire", async () => {
  const token = await createPendingPaymentToken(ORDER_ID, SECRET, 1_000);
  assert.deepEqual(await verifyPendingPaymentToken(token, SECRET, 1_001), {
    v: 1,
    type: "pending",
    orderId: ORDER_ID,
    exp: 1_900,
  });
  assert.equal(await verifyPendingPaymentToken(token, "wrong-secret", 1_001), null);
  assert.equal(await verifyPendingPaymentToken(token, SECRET, 1_900), null);

  const tampered = `${token.slice(0, -1)}${token.endsWith("a") ? "b" : "a"}`;
  assert.equal(await verifyPendingPaymentToken(tampered, SECRET, 1_001), null);
});

test("entitlement tokens cannot be substituted for pending order tokens", async () => {
  const token = await createEntitlementToken(ORDER_ID, PAYMENT_ID, SECRET, "Buyer@Example.com", 2_000);
  const entitlement = await verifyEntitlementToken(token, SECRET, 2_001);
  assert.equal(entitlement?.orderId, ORDER_ID);
  assert.equal(entitlement?.paymentId, PAYMENT_ID);
  assert.equal(entitlement?.email, "buyer@example.com");
  assert.equal(await verifyPendingPaymentToken(token, SECRET, 2_001), null);
});

test("secret comparisons behave correctly", async () => {
  assert.equal(await secureEqual("same", "same"), true);
  assert.equal(await secureEqual("same", "different"), false);
});

test("verification bodies reject malformed identifiers, signatures, and extra fields", () => {
  assert.deepEqual(
    parseVerifyRequest({
      razorpay_order_id: ORDER_ID,
      razorpay_payment_id: PAYMENT_ID,
      razorpay_signature: SIGNATURE,
    }),
    {
      razorpay_order_id: ORDER_ID,
      razorpay_payment_id: PAYMENT_ID,
      razorpay_signature: SIGNATURE,
    }
  );
  assert.equal(parseVerifyRequest({ razorpay_order_id: "other", razorpay_payment_id: PAYMENT_ID, razorpay_signature: SIGNATURE }), null);
  assert.equal(parseVerifyRequest({ razorpay_order_id: ORDER_ID, razorpay_payment_id: PAYMENT_ID, razorpay_signature: "xyz" }), null);
  assert.equal(
    parseVerifyRequest({
      razorpay_order_id: ORDER_ID,
      razorpay_payment_id: PAYMENT_ID,
      razorpay_signature: SIGNATURE,
      admin: true,
    }),
    null
  );
});

test("orders must match the fixed server-side amount and currency", () => {
  const order = { id: ORDER_ID, amount: 5_100, currency: "INR", status: "created" };
  assert.equal(isExpectedOrder(order, 5_100), true);
  assert.equal(isExpectedOrder({ ...order, amount: 100 }, 5_100), false);
  assert.equal(isExpectedOrder({ ...order, currency: "USD" }, 5_100), false);
});

test("only captured, unrefunded payments for the exact order and amount fulfill", () => {
  const payment = {
    id: PAYMENT_ID,
    order_id: ORDER_ID,
    amount: 5_100,
    currency: "INR",
    status: "captured",
    captured: true,
    amount_refunded: 0,
  };
  assert.equal(isExpectedCapturedPayment(payment, PAYMENT_ID, ORDER_ID, 5_100), true);
  assert.equal(isExpectedCapturedPayment({ ...payment, status: "authorized", captured: false }, PAYMENT_ID, ORDER_ID, 5_100), false);
  assert.equal(isExpectedCapturedPayment({ ...payment, amount: 51 }, PAYMENT_ID, ORDER_ID, 5_100), false);
  assert.equal(isExpectedCapturedPayment({ ...payment, order_id: "order_Other123456" }, PAYMENT_ID, ORDER_ID, 5_100), false);
  assert.equal(isExpectedCapturedPayment({ ...payment, amount_refunded: 5_100 }, PAYMENT_ID, ORDER_ID, 5_100), false);
});

test("provider emails are normalized before they are bound to backup delivery", () => {
  assert.equal(normalizeProviderEmail(" Buyer@Example.COM "), "buyer@example.com");
  assert.equal(normalizeProviderEmail("invalid"), null);
  assert.equal(normalizeProviderEmail(null), null);
});

test("mutation requests require an exact same-origin Origin header", () => {
  assert.equal(
    isSameOriginRequest(
      new Request("https://rishtabiodata.com/api/payment/verify", {
        headers: { Origin: "https://rishtabiodata.com" },
      })
    ),
    true
  );
  assert.equal(
    isSameOriginRequest(
      new Request("https://rishtabiodata.com/api/payment/verify", {
        headers: { Origin: "https://evil.example" },
      })
    ),
    false
  );
  assert.equal(isSameOriginRequest(new Request("https://rishtabiodata.com/api/payment/verify")), false);
});

test("JSON reader enforces the byte limit even without Content-Length", async () => {
  const accepted = await readJsonBody(
    new Request("https://example.test/api", {
      method: "POST",
      body: JSON.stringify({ ok: true }),
      headers: { "Content-Type": "application/json" },
    }),
    100
  );
  assert.deepEqual(accepted, { ok: true, value: { ok: true } });

  const rejected = await readJsonBody(
    new Request("https://example.test/api", {
      method: "POST",
      body: JSON.stringify({ value: "x".repeat(200) }),
      headers: { "Content-Type": "application/json" },
    }),
    100
  );
  assert.deepEqual(rejected, { ok: false, status: 413 });
});

test("cookies are HttpOnly, strict, scoped, and secure when requested", () => {
  assert.equal(
    serializeCookie("session", "token", { maxAge: 60, path: "/", secure: true }),
    "session=token; Max-Age=60; Path=/; HttpOnly; SameSite=Strict; Secure"
  );
});

test("rate limiting fails closed outside local development", async () => {
  assert.equal(
    await enforceRateLimit(undefined, new Request("http://localhost/api"), "test"),
    "allowed"
  );
  assert.equal(
    await enforceRateLimit(undefined, new Request("https://rishtabiodata.com/api"), "test"),
    "unavailable"
  );
  assert.equal(
    await enforceRateLimit({ limit: async () => ({ success: false }) }, new Request("https://example.test/api"), "test"),
    "limited"
  );
});

test("sensitive JSON responses are explicitly non-cacheable", async () => {
  const response = jsonNoStore({ ok: true });
  assert.equal(response.headers.get("cache-control"), "no-store, max-age=0");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.deepEqual(await response.json(), { ok: true });
});

test("site-wide headers block framing and restrict third-party execution", async () => {
  const rules = await nextConfig.headers();
  const headers = Object.fromEntries(rules[0].headers.map(({ key, value }) => [key, value]));
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.match(headers["Content-Security-Policy"], /frame-ancestors 'none'/u);
  assert.match(headers["Content-Security-Policy"], /checkout\.razorpay\.com/u);
  assert.doesNotMatch(headers["Content-Security-Policy"], /unsafe-eval/u);
});
