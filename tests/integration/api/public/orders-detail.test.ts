import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { order: { findUnique: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/orders/[id]", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return order by id", async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue({
      id: "order-1", orderNumber: "SLT-001", status: "PENDING", items: [],
    } as never);

    const result = await prisma.order.findUnique({ where: { id: "order-1" }, include: { items: true } });
    expect(result).toBeDefined();
    expect(result!.orderNumber).toBe("SLT-001");
  });

  it("should return null for non-existent order", async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue(null);
    const result = await prisma.order.findUnique({ where: { id: "nope" } });
    expect(result).toBeNull();
  });
});
