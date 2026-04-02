import { vi } from "vitest";

export const storageMock = {
  upload: vi.fn().mockResolvedValue({
    url: "/uploads/test/test-image.jpg",
    key: "test/test-image.jpg",
  }),
  delete: vi.fn().mockResolvedValue(undefined),
  getSignedUrl: vi.fn().mockResolvedValue("https://storage.test.com/signed-url"),
  exists: vi.fn().mockResolvedValue(true),
};

vi.mock("@/lib/storage/upload", () => ({
  uploadFile: storageMock.upload,
  deleteFile: storageMock.delete,
  getSignedUrl: storageMock.getSignedUrl,
}));
