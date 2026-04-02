import { STORAGE_CONFIG } from "./constants";

export function validateFile(file: { size: number; type: string; name: string }) {
  if (file.size > STORAGE_CONFIG.maxFileSize) {
    return { valid: false, error: `File too large. Max ${STORAGE_CONFIG.maxFileSize / 1024 / 1024}MB.` };
  }
  if (!STORAGE_CONFIG.allowedMimeTypes.includes(file.type as typeof STORAGE_CONFIG.allowedMimeTypes[number])) {
    return { valid: false, error: `Invalid file type. Allowed: ${STORAGE_CONFIG.allowedMimeTypes.join(", ")}` };
  }
  return { valid: true, error: null };
}
