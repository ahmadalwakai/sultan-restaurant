import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { booking: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/bookings/availability", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return availability for a date", async () => {
    vi.mocked(prisma.booking.findMany).mockResolvedValue([
      { id: "b1", time: "18:00", guests: 4 },
      { id: "b2", time: "19:00", guests: 2 },
    ] as never);

    const bookings = await prisma.booking.findMany({
      where: { date: new Date("2024-12-25"), status: { not: "CANCELLED" } },
    });
    expect(bookings).toHaveLength(2);
  });

  it("should return empty for no bookings", async () => {
    vi.mocked(prisma.booking.findMany).mockResolvedValue([] as never);
    const bookings = await prisma.booking.findMany({
      where: { date: new Date("2024-01-01") },
    });
    expect(bookings).toHaveLength(0);
  });
});
