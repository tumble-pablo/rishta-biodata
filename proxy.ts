import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "rishtabiodata.com";

// Alternate domains that should permanently redirect to the canonical host.
// workers.dev, preview URLs and localhost are intentionally left alone.
const ALTERNATE_HOSTS = new Set([
  "www.rishtabiodata.com",
  "rishtabiodata.in",
  "www.rishtabiodata.in",
]);

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  if (!ALTERNATE_HOSTS.has(host)) return NextResponse.next();

  const url = new URL(request.url);
  url.protocol = "https:";
  url.host = CANONICAL_HOST;
  url.port = "";
  return NextResponse.redirect(url, 301);
}
