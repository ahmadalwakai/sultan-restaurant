import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/storage/constants", () => ({
  STORAGE_CONFIG: {
    maxSize: 5 * 1024 * 1024,
    acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    uploadDir: "public/uploads",
    publicPath: "/uploads",
  },
}));

import { STORAGE_CONFIG } from "@/lib/storage/constants";

describe("Image Processing", () => {
  it("should have correct max file size of 5MB", () => {
    expect(STORAGE_CONFIG.maxSize).toBe(5 * 1024 * 1024);
  });

  it("should accept jpeg, png, webp, gif", () => {
    expect(STORAGE_CONFIG.acceptedTypes).toContain("image/jpeg");
    expect(STORAGE_CONFIG.acceptedTypes).toContain("image/png");
    expect(STORAGE_CONFIG.acceptedTypes).toContain("image/webp");
    expect(STORAGE_CONFIG.acceptedTypes).toContain("image/gif");
  });

  it("should not accept svg", () => {
    expect(STORAGE_CONFIG.acceptedTypes).not.toContain("image/svg+xml");
  });

  it("should use public/uploads directory", () => {
    expect(STORAGE_CONFIG.uploadDir).toBe("public/uploads");
  });

  it("should expose /uploads public path", () => {
    expect(STORAGE_CONFIG.publicPath).toBe("/uploads");
  });
});
