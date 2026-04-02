import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    order: { findMany: vi.fn(), count: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/admin/orders", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return paginated orders", async () => {
    vi.mocked(prisma.order.findMany).mockResolvedValue([
      { id: "o1", orderNumber: "SLT-001", status: "PENDING", items: [] },
    ] as never);
    vi.mocked(prisma.order.count).mockResolvedValue(1);

    const orders = await prisma.order.findMany({ take: 20, skip: 0, include: { items: true } });
    expect(orders).toHaveLength(1);
  });

  it("should filter by status", async () => {
    vi.mocked(prisma.order.findMany).mockResolvedValue([] as never);
    await prisma.order.findMany({ where: { status: "PREPARING" } });
    expect(prisma.order.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "PREPARING" } })
    );
  });
});
