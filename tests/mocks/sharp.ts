import { vi } from "vitest";

export const sharpMock = vi.fn().mockReturnValue({
  resize: vi.fn().mockReturnThis(),
  jpeg: vi.fn().mockReturnThis(),
  webp: vi.fn().mockReturnThis(),
  png: vi.fn().mockReturnThis(),
  toBuffer: vi.fn().mockResolvedValue(Buffer.from("test-image-data")),
  toFile: vi.fn().mockResolvedValue({ width: 800, height: 600, size: 50000 }),
  metadata: vi.fn().mockResolvedValue({
    width: 1920,
    height: 1080,
    format: "jpeg",
    size: 200000,
  }),
});

vi.mock("sharp", () => ({
  default: sharpMock,
}));
