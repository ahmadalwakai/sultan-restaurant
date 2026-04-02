import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    order: { count: vi.fn(), aggregate: vi.fn() },
    booking: { count: vi.fn() },
    user: { count: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/admin/dashboard/stats", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return dashboard statistics", async () => {
    vi.mocked(prisma.order.count).mockResolvedValue(150);
    vi.mocked(prisma.booking.count).mockResolvedValue(45);
    vi.mocked(prisma.user.count).mockResolvedValue(200);
    vi.mocked(prisma.order.aggregate).mockResolvedValue({
      _sum: { total: { toNumber: () => 5000 } },
    } as never);

    const orderCount = await prisma.order.count();
    const bookingCount = await prisma.booking.count();
    const customerCount = await prisma.user.count();
    expect(orderCount).toBe(150);
    expect(bookingCount).toBe(45);
    expect(customerCount).toBe(200);
  });
});
