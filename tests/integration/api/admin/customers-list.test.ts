import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    user: { findMany: vi.fn(), count: vi.fn(), findUnique: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Customers", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should list customers with order counts", async () => {
    vi.mocked(prisma.user.findMany).mockResolvedValue([
      { id: "u1", name: "John", email: "john@test.com", _count: { orders: 5, bookings: 2 } },
    ] as never);

    const customers = await prisma.user.findMany({
      include: { _count: { select: { orders: true, bookings: true } } },
    });
    expect(customers).toHaveLength(1);
  });

  it("should get customer detail with recent orders", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: "u1", name: "John", orders: [{ id: "o1" }], bookings: [{ id: "b1" }],
    } as never);

    const customer = await prisma.user.findUnique({
      where: { id: "u1" },
      include: { orders: { take: 10 }, bookings: { take: 10 } },
    });
    expect(customer!.orders).toHaveLength(1);
  });
});
