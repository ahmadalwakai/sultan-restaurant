import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/storage/upload", () => ({
  uploadFile: vi.fn().mockResolvedValue({ key: "menu/test-uuid.jpg", url: "/uploads/menu/test-uuid.jpg" }),
}));
vi.mock("@/lib/storage/delete", () => ({
  deleteFile: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/storage/validate-file", () => ({
  validateFile: vi.fn(),
}));

import { uploadFile } from "@/lib/storage/upload";
import { deleteFile } from "@/lib/storage/delete";

describe("Admin Uploads", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should upload a file", async () => {
    const file = new File([Buffer.from("test")], "photo.jpg", { type: "image/jpeg" });
    const result = await uploadFile(file, "menu");
    expect(result.key).toContain("menu/");
    expect(result.url).toContain("/uploads/");
  });

  it("should delete a file", async () => {
    await deleteFile("menu/test-uuid.jpg");
    expect(deleteFile).toHaveBeenCalledWith("menu/test-uuid.jpg");
  });
});
