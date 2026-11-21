import type { ImportedBiodata } from "@/lib/biodata/import-schema";

// Browser half of "Bring your old biodata": shrinks photos before upload
// (phone photos are often 5-10 MB; the text stays perfectly readable at
// 2000 px, and smaller images are faster and cheaper to read), then posts
// the file to /api/biodata-import.

const MAX_IMAGE_EDGE = 2000;
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export class ImportError extends Error {}

async function shrinkImage(file: File): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new ImportError("This photo could not be opened. Try a JPG or PNG."));
      element.src = url;
    });

    const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    const context = canvas.getContext("2d");
    if (!context) throw new ImportError("This photo could not be processed.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    if (!blob) throw new ImportError("This photo could not be processed.");
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function importBiodataFile(file: File): Promise<ImportedBiodata> {
  let upload: Blob;
  let filename: string;
  if (file.type === "application/pdf") {
    upload = file;
    filename = "biodata.pdf";
  } else if (file.type.startsWith("image/")) {
    upload = await shrinkImage(file);
    filename = "biodata.jpg";
  } else {
    throw new ImportError("Please choose a photo (JPG or PNG) or a PDF of your biodata.");
  }

  if (upload.size > MAX_UPLOAD_BYTES) {
    throw new ImportError("This file is too large. Please use one under 5 MB.");
  }

  const body = new FormData();
  body.append("file", upload, filename);

  let response: Response;
  try {
    response = await fetch("/api/biodata-import", { method: "POST", body });
  } catch {
    throw new ImportError("Could not connect. Check your internet and try again.");
  }

  const payload = (await response.json().catch(() => null)) as
    | { imported?: ImportedBiodata; error?: string }
    | null;
  if (!response.ok || !payload?.imported) {
    throw new ImportError(payload?.error ?? "Something went wrong while reading your file. Please try again.");
  }
  return payload.imported;
}
