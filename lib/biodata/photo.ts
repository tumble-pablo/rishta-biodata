// Turns a picked image file into the small, passport-style photo the
// biodata shows. Everything happens in the browser: the photo is never
// uploaded, it lives in form state and the localStorage draft like every
// other field, and only leaves the device inside the PDF the person chooses
// to download or share.
//
// Output is a fixed 3:4 JPEG (the slot's shape on the biodata), centre-
// cropped and scaled down so a 12 MP phone photo becomes ~60-120 KB —
// small enough to keep the draft well inside localStorage's quota and the
// PDF WhatsApp-light.

export const PHOTO_DATA_URL_PREFIX = "data:image/jpeg;base64,";

const OUTPUT_WIDTH = 480;
const OUTPUT_HEIGHT = 640;
const JPEG_QUALITY = 0.85;
const MAX_INPUT_BYTES = 20 * 1024 * 1024;

export class PhotoError extends Error {}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new PhotoError("This photo could not be opened. Try a JPG or PNG."));
    };
    image.src = url;
  });
}

export async function preparePhoto(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new PhotoError("Please choose a photo (JPG or PNG).");
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new PhotoError("This photo is too large. Please choose one under 20 MB.");
  }

  const image = await loadImage(file);
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;
  if (!sourceWidth || !sourceHeight) {
    throw new PhotoError("This photo could not be opened. Try a JPG or PNG.");
  }

  // Centre-crop to 3:4. Biodata photos are usually head-and-shoulders, so
  // for tall images bias the crop a little toward the top, where faces are.
  const targetRatio = OUTPUT_WIDTH / OUTPUT_HEIGHT;
  let cropWidth = sourceWidth;
  let cropHeight = sourceWidth / targetRatio;
  if (cropHeight > sourceHeight) {
    cropHeight = sourceHeight;
    cropWidth = sourceHeight * targetRatio;
  }
  const cropX = (sourceWidth - cropWidth) / 2;
  const cropY = Math.max(0, (sourceHeight - cropHeight) * 0.3);

  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_WIDTH;
  canvas.height = OUTPUT_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new PhotoError("This photo could not be processed.");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
  context.imageSmoothingQuality = "high";
  context.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}
