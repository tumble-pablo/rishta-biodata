import { env } from "cloudflare:workers";

import { getCookie, jsonNoStore, requestUsesHttps, serializeCookie } from "@/lib/server/http-security";
import { ENTITLEMENT_COOKIE, verifyEntitlementToken } from "@/lib/server/payment-session";

export async function GET(request: Request) {
  const keySecret = env.PAYMENT_SESSION_SECRET || env.RAZORPAY_KEY_SECRET;
  const token = getCookie(request, ENTITLEMENT_COOKIE);
  if (!keySecret || !token) return jsonNoStore({ hasPaid: false });

  const entitlement = await verifyEntitlementToken(token, keySecret);
  if (entitlement) return jsonNoStore({ hasPaid: true });

  return jsonNoStore(
    { hasPaid: false },
    {
      headers: {
        "Set-Cookie": serializeCookie(ENTITLEMENT_COOKIE, "", {
          maxAge: 0,
          path: "/",
          secure: requestUsesHttps(request),
        }),
      },
    }
  );
}
