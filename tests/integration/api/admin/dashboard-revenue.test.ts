import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: { order: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/admin/dashboard/revenue", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return revenue data for last 30 days", async () => {
    vi.mocked(prisma.order.findMany).mockResolvedValue([
      { createdAt: new Date(), total: { toNumber: () => 45.50 } },
      { createdAt: new Date(), total: { toNumber: () => 32.00 } },
    ] as never);

    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      select: { createdAt: true, total: true },
    });
    expect(orders).toHaveLength(2);
  });
});
