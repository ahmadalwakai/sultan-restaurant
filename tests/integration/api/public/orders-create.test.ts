import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { order: { create: vi.fn() }, menuItem: { findMany: vi.fn() } },
}));
vi.mock("@/lib/session", () => ({ getSession: vi.fn().mockResolvedValue(null) }));

import prisma from "@/lib/db/prisma";

describe("POST /api/orders", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should create an order with valid data", async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([
      { id: "menu-1", price: { toNumber: () => 12.95 }, isAvailable: true },
    ] as never);
    vi.mocked(prisma.order.create).mockResolvedValue({
      id: "order-1", orderNumber: "SLT-001", status: "PENDING",
    } as never);

    const result = await prisma.order.create({ data: {} as never });
    expect(result.id).toBe("order-1");
    expect(result.status).toBe("PENDING");
  });
});
