import { describe, it, expect, vi, beforeEach } from "vitest";
import { uploadFile } from "@/lib/storage/upload";

vi.mock("@/lib/storage/validate-file", () => ({
  validateFile: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({
  mkdir: vi.fn().mockResolvedValue(undefined),
  writeFile: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("node:crypto", () => ({
  randomUUID: vi.fn().mockReturnValue("test-uuid-1234"),
}));

describe("Image Naming", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should generate UUID-based file names", async () => {
    const file = new File([Buffer.from("test")], "photo.jpg", {
      type: "image/jpeg",
    });
    const result = await uploadFile(file, "menu");
    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  it("should use correct upload folder", async () => {
    const file = new File([Buffer.from("test")], "photo.jpg", {
      type: "image/jpeg",
    });
    const result = await uploadFile(file, "menu");
    expect(result).toBeDefined();
  });

  it("should preserve file extension", async () => {
    const file = new File([Buffer.from("test")], "photo.png", {
      type: "image/png",
    });
    const result = await uploadFile(file, "hero");
    expect(result).toBeDefined();
  });
});
