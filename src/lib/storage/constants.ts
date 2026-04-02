export const STORAGE_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  uploadDir: "public/uploads",
  publicPath: "/uploads",
} as const;
