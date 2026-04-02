// Image compression placeholder - use sharp in production
export async function compressImage(buffer: Buffer, _options?: { quality?: number; maxWidth?: number }): Promise<Buffer> {
  // In production, integrate sharp:
  // return sharp(buffer).resize(options.maxWidth).jpeg({ quality: options.quality }).toBuffer();
  return buffer;
}
