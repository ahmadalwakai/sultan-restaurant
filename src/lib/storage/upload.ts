import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { STORAGE_CONFIG } from "./constants";
import { validateFile } from "./validate-file";

export async function uploadFile(file: File, folder?: string): Promise<{ url: string; key: string }> {
  const validation = validateFile({ size: file.size, type: file.type, name: file.name });
  if (!validation.valid) throw new Error(validation.error!);

  const ext = path.extname(file.name) || ".jpg";
  const key = `${crypto.randomUUID()}${ext}`;
  const subDir = folder || "";
  const uploadDir = path.join(process.cwd(), STORAGE_CONFIG.uploadDir, subDir);
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, key), buffer);

  const urlPath = folder ? `${STORAGE_CONFIG.publicPath}/${folder}/${key}` : `${STORAGE_CONFIG.publicPath}/${key}`;
  return { url: urlPath, key };
}
