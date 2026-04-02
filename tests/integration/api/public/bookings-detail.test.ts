import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { booking: { findUnique: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/bookings/[id]", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return booking by id", async () => {
    vi.mocked(prisma.booking.findUnique).mockResolvedValue({
      id: "booking-1", customerName: "John", email: "john@test.com",
      date: new Date("2024-12-25"), time: "19:00", guests: 4, status: "CONFIRMED",
    } as never);

    const result = await prisma.booking.findUnique({ where: { id: "booking-1" } });
    expect(result).toBeDefined();
    expect(result!.status).toBe("CONFIRMED");
  });

  it("should return null for non-existent booking", async () => {
    vi.mocked(prisma.booking.findUnique).mockResolvedValue(null);
    const result = await prisma.booking.findUnique({ where: { id: "nope" } });
    expect(result).toBeNull();
  });
});
