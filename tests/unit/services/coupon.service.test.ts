import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { coupons } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("couponService", () => {
  beforeEach(() => resetPrismaMock());

  describe("validate", () => {
    it("should validate an active, unexpired coupon", async () => {
      prismaMock.coupon.findUnique.mockResolvedValue(coupons[0]);

      const { couponService } = await import("@/lib/services");
      const result = await couponService.validate("WELCOME10", 20);

      expect(result).toBeDefined();
    });

    it("should reject an expired coupon", async () => {
      prismaMock.coupon.findUnique.mockResolvedValue(coupons[1]);

      const { couponService } = await import("@/lib/services");
      await expect(couponService.validate("EXPIRED5", 20)).rejects.toThrow();
    });

    it("should reject a maxed-out coupon", async () => {
      prismaMock.coupon.findUnique.mockResolvedValue(coupons[2]);

      const { couponService } = await import("@/lib/services");
      await expect(couponService.validate("MAXEDOUT", 25)).rejects.toThrow();
    });

    it("should reject when order below minimum", async () => {
      prismaMock.coupon.findUnique.mockResolvedValue(coupons[0]);

      const { couponService } = await import("@/lib/services");
      await expect(couponService.validate("WELCOME10", 5)).rejects.toThrow();
    });
  });
});
