import { describe, it, expect, vi } from "vitest";
import { validateFile } from "@/lib/storage/validate-file";

vi.mock("@/lib/storage/constants", () => ({
  STORAGE_CONFIG: {
    maxSize: 5 * 1024 * 1024,
    acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
}));

describe("Image Validator", () => {
  const createMockFile = (size: number, type: string): File => {
    const buffer = new ArrayBuffer(size);
    return new File([buffer], "test.jpg", { type });
  };

  it("should accept valid jpeg under 5MB", () => {
    const file = createMockFile(1024 * 1024, "image/jpeg");
    expect(() => validateFile(file)).not.toThrow();
  });

  it("should accept valid png under 5MB", () => {
    const file = createMockFile(2 * 1024 * 1024, "image/png");
    expect(() => validateFile(file)).not.toThrow();
  });

  it("should accept valid webp", () => {
    const file = createMockFile(1024, "image/webp");
    expect(() => validateFile(file)).not.toThrow();
  });

  it("should reject file over 5MB", () => {
    const file = createMockFile(6 * 1024 * 1024, "image/jpeg");
    expect(() => validateFile(file)).toThrow();
  });

  it("should reject unsupported MIME type", () => {
    const file = createMockFile(1024, "application/pdf");
    expect(() => validateFile(file)).toThrow();
  });
});
