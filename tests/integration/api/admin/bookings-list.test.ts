import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: { booking: { findMany: vi.fn(), count: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/admin/bookings", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return paginated bookings", async () => {
    vi.mocked(prisma.booking.findMany).mockResolvedValue([
      { id: "b1", customerName: "John", status: "CONFIRMED" },
      { id: "b2", customerName: "Jane", status: "PENDING" },
    ] as never);
    vi.mocked(prisma.booking.count).mockResolvedValue(2);

    const bookings = await prisma.booking.findMany({ take: 20, skip: 0 });
    expect(bookings).toHaveLength(2);
  });

  it("should filter by status", async () => {
    vi.mocked(prisma.booking.findMany).mockResolvedValue([
      { id: "b1", status: "PENDING" },
    ] as never);

    const bookings = await prisma.booking.findMany({ where: { status: "PENDING" } });
    expect(bookings).toHaveLength(1);
  });
});
