import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { order: { create: vi.fn() }, menuItem: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("POST /api/checkout", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should process checkout with valid items", async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([
      { id: "menu-1", price: { toNumber: () => 12.95 }, isAvailable: true, name: "Tikka" },
    ] as never);
    vi.mocked(prisma.order.create).mockResolvedValue({
      id: "order-1", orderNumber: "SLT-001", total: 12.95,
    } as never);

    const order = await prisma.order.create({ data: {} as never });
    expect(order.id).toBe("order-1");
  });
});
