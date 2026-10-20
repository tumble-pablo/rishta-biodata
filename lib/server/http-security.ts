const JSON_CONTENT_TYPE = "application/json";

export const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
} as const;

export function jsonNoStore(body: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", NO_STORE_HEADERS["Cache-Control"]);
  headers.set("Pragma", NO_STORE_HEADERS.Pragma);
  headers.set("X-Content-Type-Options", NO_STORE_HEADERS["X-Content-Type-Options"]);
  return Response.json(body, { ...init, headers });
}

export function isJsonRequest(request: Request): boolean {
  return request.headers.get("content-type")?.toLowerCase().startsWith(JSON_CONTENT_TYPE) ?? false;
}

/** Browser-only mutation routes must come from this exact origin. */
export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export type JsonReadResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413 };

/** Reads JSON incrementally and stops before an attacker can buffer an unbounded body. */
export async function readJsonBody(request: Request, maxBytes: number): Promise<JsonReadResult> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength) {
    const parsedLength = Number(declaredLength);
    if (!Number.isFinite(parsedLength) || parsedLength < 0) return { ok: false, status: 400 };
    if (parsedLength > maxBytes) return { ok: false, status: 413 };
  }
  if (!request.body) return { ok: false, status: 400 };

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let totalBytes = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { ok: false, status: 413 };
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, status: 400 };
  } finally {
    reader.releaseLock();
  }
}

export async function readJsonResponse(response: Response, maxBytes: number): Promise<unknown | null> {
  if (!response.body) return null;
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let totalBytes = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;

  for (const item of header.split(";")) {
    const separator = item.indexOf("=");
    if (separator < 0 || item.slice(0, separator).trim() !== name) continue;
    return item.slice(separator + 1).trim();
  }
  return null;
}

export function serializeCookie(
  name: string,
  value: string,
  options: { maxAge: number; path: string; secure: boolean }
): string {
  const attributes = [
    `${name}=${value}`,
    `Max-Age=${Math.max(0, Math.floor(options.maxAge))}`,
    `Path=${options.path}`,
    "HttpOnly",
    "SameSite=Strict",
  ];
  if (options.secure) attributes.push("Secure");
  return attributes.join("; ");
}

export function requestUsesHttps(request: Request): boolean {
  return new URL(request.url).protocol === "https:";
}

function isLocalRequest(request: Request): boolean {
  const hostname = new URL(request.url).hostname;
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

async function rateLimitKey(scope: string, actor: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${scope}:${actor}`));
  return Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export type RateLimitResult = "allowed" | "limited" | "unavailable";

export async function enforceRateLimit(
  limiter: RateLimit | undefined,
  request: Request,
  scope: string,
  stableActor?: string
): Promise<RateLimitResult> {
  // The Vite development server does not provide production bindings. Keep
  // local development usable, but fail closed if a deployed binding vanishes.
  if (!limiter) return isLocalRequest(request) ? "allowed" : "unavailable";

  const actor =
    stableActor ??
    `${request.headers.get("cf-connecting-ip") ?? "unknown"}|${
      request.headers.get("user-agent")?.slice(0, 160) ?? "unknown"
    }`;
  const outcome = await limiter.limit({ key: await rateLimitKey(scope, actor) });
  return outcome.success ? "allowed" : "limited";
}
