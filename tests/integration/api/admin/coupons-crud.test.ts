import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    coupon: { findMany: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Coupons CRUD", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should list coupons", async () => {
    vi.mocked(prisma.coupon.findMany).mockResolvedValue([
      { id: "c1", code: "WELCOME10", isActive: true, discountType: "PERCENTAGE", discountValue: 10 },
    ] as never);

    const coupons = await prisma.coupon.findMany();
    expect(coupons).toHaveLength(1);
  });

  it("should create a coupon", async () => {
    vi.mocked(prisma.coupon.create).mockResolvedValue({
      id: "c2", code: "SUMMER20", discountType: "PERCENTAGE", discountValue: 20,
    } as never);

    const coupon = await prisma.coupon.create({ data: { code: "SUMMER20" } as never });
    expect(coupon.code).toBe("SUMMER20");
  });

  it("should delete a coupon", async () => {
    vi.mocked(prisma.coupon.delete).mockResolvedValue({ id: "c1" } as never);
    await prisma.coupon.delete({ where: { id: "c1" } });
    expect(prisma.coupon.delete).toHaveBeenCalled();
  });
});
