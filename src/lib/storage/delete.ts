import { unlink } from "fs/promises";
import path from "path";
import { STORAGE_CONFIG } from "./constants";

export async function deleteFile(key: string): Promise<void> {
  const sanitized = path.basename(key);
  const filePath = path.join(/*turbopackIgnore: true*/ process.cwd(), STORAGE_CONFIG.uploadDir, sanitized);
  try {
    await unlink(filePath);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
  }
}
