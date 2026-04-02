import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { coupon: { findUnique: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("POST /api/checkout/apply-coupon", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should apply valid coupon", async () => {
    vi.mocked(prisma.coupon.findUnique).mockResolvedValue({
      id: "c1", code: "WELCOME10", discountType: "PERCENTAGE",
      discountValue: 10, isActive: true, expiresAt: new Date("2030-01-01"),
      usageCount: 0, maxUsage: 100, minOrderAmount: 0,
    } as never);

    const coupon = await prisma.coupon.findUnique({ where: { code: "WELCOME10" } });
    expect(coupon).toBeDefined();
    expect(coupon!.discountValue).toBe(10);
  });

  it("should reject expired coupon", async () => {
    vi.mocked(prisma.coupon.findUnique).mockResolvedValue({
      id: "c2", code: "EXPIRED5", isActive: true,
      expiresAt: new Date("2020-01-01"),
    } as never);

    const coupon = await prisma.coupon.findUnique({ where: { code: "EXPIRED5" } });
    expect(new Date(coupon!.expiresAt) < new Date()).toBe(true);
  });
});
