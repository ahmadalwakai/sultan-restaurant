import { describe, it, expect, vi, beforeEach } from "vitest";
import { sharpMock } from "../../mocks/sharp";

vi.mock("sharp", () => ({ default: sharpMock }));

describe("imageService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("processImage", () => {
    it("should resize and convert image to webp", async () => {
      const sharp = (await import("sharp")).default;
      const result = sharp(Buffer.from("test")).resize(800, 600).webp().toBuffer();

      expect(sharpMock).toHaveBeenCalled();
      expect(sharpMock().resize).toHaveBeenCalledWith(800, 600);
      expect(sharpMock().webp).toHaveBeenCalled();
    });

    it("should get image metadata", async () => {
      const sharp = (await import("sharp")).default;
      const metadata = await sharp(Buffer.from("test")).metadata();

      expect(metadata).toEqual({
        width: 1920,
        height: 1080,
        format: "jpeg",
        size: 200000,
      });
    });
  });
});
