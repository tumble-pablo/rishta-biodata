import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { env } from "cloudflare:workers";

import { importedBiodataSchema } from "@/lib/biodata/import-schema";
import { enforceRateLimit, isSameOriginRequest, jsonNoStore } from "@/lib/server/http-security";

// "Bring your old biodata": reads a photo/scan or PDF of an existing
// biodata with Claude and returns its details in the builder's own field
// shape (see lib/biodata/import-schema.ts). Nothing is stored — the file is
// held in memory for this one request and only the extracted fields are
// returned to the browser, which merges them into the local draft.

// Images are downscaled in the browser before upload (see
// lib/biodata/import-client.ts), so this mostly bounds PDFs. Claude accepts
// up to 5 MB per image; 5 MB keeps PDFs to a sensible size and cost too.
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
type ImageType = (typeof IMAGE_TYPES)[number];

const SYSTEM_PROMPT = `You read an Indian marriage biodata and copy its details into a fixed set of fields.

The document may be a phone photo, a scan or a PDF, in English, Hindi, Marathi or another Indian language, and may be handwritten.

Copy only what the document actually says. Never guess, infer or invent a value: if a detail is missing, unreadable or unclear, leave that field as an empty string. A wrong value is worse than an empty one, because a family will send this biodata to other families.

- Write names, places, caste, gotra, occupations and other free text the way the document writes them, in the same script.
- For choice fields, pick the option that matches what is written, or "" if nothing matches clearly. Map common words: for example "Vegetarian" or "शाकाहारी" is vegetarian; "Graduate", "B.Com" or "B.Tech" is bachelors; a salary is placed in the matching annual income band only if it is stated per year or clearly convertible.
- Rashi and nakshatra may be written in English or Devanagari, e.g. "मेष" is mesh, "रोहिणी" is rohini.
- Dates become YYYY-MM-DD and times become 24-hour HH:MM. If only part of a date is written, leave it empty.
- Phone numbers: digits only, without the country code.
- aboutMe is only the person's own description of themselves, not a summary you write.

If the file is not a biodata or personal profile at all, set isBiodata to false and leave every field empty.`;

function errorResponse(status: number, error: string, extra: ResponseInit = {}) {
  return jsonNoStore({ error }, { status, ...extra });
}

function toBase64(bytes: ArrayBuffer): string {
  // Chunked to stay clear of argument-count limits on large files.
  const view = new Uint8Array(bytes);
  let binary = "";
  for (let index = 0; index < view.length; index += 0x8000) {
    binary += String.fromCharCode(...view.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return errorResponse(403, "Cross-origin requests are not allowed.");
  }

  const rateLimit = await enforceRateLimit(env.IMPORT_RATE_LIMITER, request, "biodata-import");
  if (rateLimit === "limited") {
    return errorResponse(429, "Too many uploads. Please wait a minute and try again.", {
      headers: { "Retry-After": "60" },
    });
  }
  if (rateLimit === "unavailable") {
    console.error(JSON.stringify({ event: "import_rate_limiter_unavailable" }));
    return errorResponse(503, "Reading biodata files is not available right now.");
  }

  if (!env.ANTHROPIC_API_KEY) {
    console.error(JSON.stringify({ event: "import_configuration_missing" }));
    return errorResponse(503, "Reading biodata files is not available right now.");
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_FILE_BYTES + 64 * 1024) {
    return errorResponse(413, "This file is too large. Please use one under 5 MB.");
  }

  let file: File;
  try {
    const form = await request.formData();
    const value = form.get("file");
    if (!(value instanceof File)) return errorResponse(400, "Please choose a file to upload.");
    file = value;
  } catch {
    return errorResponse(400, "This upload could not be read. Please try again.");
  }

  if (file.size === 0 || file.size > MAX_FILE_BYTES) {
    return errorResponse(413, "This file is too large. Please use one under 5 MB.");
  }

  const isPdf = file.type === "application/pdf";
  const isImage = (IMAGE_TYPES as readonly string[]).includes(file.type);
  if (!isPdf && !isImage) {
    return errorResponse(415, "Please upload a photo (JPG or PNG) or a PDF of your biodata.");
  }

  const data = toBase64(await file.arrayBuffer());
  const fileBlock: Anthropic.Beta.BetaContentBlockParam = isPdf
    ? { type: "document", source: { type: "base64", media_type: "application/pdf", data } }
    : { type: "image", source: { type: "base64", media_type: file.type as ImageType, data } };

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 55_000 });

  try {
    const response = await client.beta.messages.parse({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      // A simple copying task: low effort keeps it fast and cheap.
      output_config: { effort: "low", format: betaZodOutputFormat(importedBiodataSchema) },
      // If a safety classifier declines, the API retries on a suitable
      // fallback model within the same call instead of failing outright.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [fileBlock, { type: "text", text: "Copy this biodata's details into the fields." }],
        },
      ],
    });

    // Token counts only — never the document or the extracted values.
    console.log(
      JSON.stringify({
        event: "biodata_import",
        kind: isPdf ? "pdf" : "image",
        stop_reason: response.stop_reason,
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      })
    );

    if (response.stop_reason === "refusal" || !response.parsed_output) {
      return errorResponse(422, "We couldn't read this file. Please try a clearer photo, or fill in the form yourself.");
    }
    if (!response.parsed_output.isBiodata) {
      return errorResponse(422, "This doesn't look like a biodata. Please upload a photo or PDF of a biodata.");
    }

    return jsonNoStore({ imported: response.parsed_output });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return errorResponse(429, "We're busy right now. Please try again in a minute.");
    }
    if (error instanceof Anthropic.BadRequestError) {
      console.error(JSON.stringify({ event: "import_bad_request", message: error.message.slice(0, 300) }));
      return errorResponse(422, "We couldn't read this file. Please try a clearer photo or a different file.");
    }
    if (error instanceof Anthropic.APIError) {
      console.error(JSON.stringify({ event: "import_api_error", status: error.status }));
    } else {
      console.error(JSON.stringify({ event: "import_failed" }));
    }
    return errorResponse(502, "Something went wrong while reading your file. Please try again.");
  }
}
