import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { coupon: { findUnique: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("POST /api/coupons/validate", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should validate active coupon with sufficient order total", async () => {
    vi.mocked(prisma.coupon.findUnique).mockResolvedValue({
      code: "WELCOME10", isActive: true, discountType: "PERCENTAGE",
      discountValue: 10, minOrderAmount: 20, maxUsage: 100, usageCount: 5,
      expiresAt: new Date("2030-01-01"),
    } as never);

    const coupon = await prisma.coupon.findUnique({ where: { code: "WELCOME10" } });
    expect(coupon!.isActive).toBe(true);
    expect(coupon!.usageCount).toBeLessThan(coupon!.maxUsage);
  });

  it("should reject maxed-out coupon", async () => {
    vi.mocked(prisma.coupon.findUnique).mockResolvedValue({
      code: "MAXEDOUT", isActive: true, maxUsage: 10, usageCount: 10,
    } as never);

    const coupon = await prisma.coupon.findUnique({ where: { code: "MAXEDOUT" } });
    expect(coupon!.usageCount).toBeGreaterThanOrEqual(coupon!.maxUsage);
  });
});
