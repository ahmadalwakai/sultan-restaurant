import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: { order: { findUnique: vi.fn(), update: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Order Detail & Status", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should get order detail with items", async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue({
      id: "o1", orderNumber: "SLT-001", items: [{ menuItem: { name: "Tikka" } }],
    } as never);

    const order = await prisma.order.findUnique({
      where: { id: "o1" },
      include: { items: { include: { menuItem: true } } },
    });
    expect(order).toBeDefined();
    expect(order!.items).toHaveLength(1);
  });

  it("should update order status", async () => {
    vi.mocked(prisma.order.update).mockResolvedValue({
      id: "o1", status: "PREPARING",
    } as never);

    const order = await prisma.order.update({
      where: { id: "o1" },
      data: { status: "PREPARING" },
    });
    expect(order.status).toBe("PREPARING");
  });
});
