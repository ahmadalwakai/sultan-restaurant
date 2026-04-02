import { STORAGE_CONFIG } from "./constants";

// For local storage, return public URL directly
// In production with S3/R2, generate signed URLs
export function getSignedUrl(key: string): string {
  return `${STORAGE_CONFIG.publicPath}/${key}`;
}
