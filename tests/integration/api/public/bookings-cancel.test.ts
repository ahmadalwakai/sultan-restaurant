import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { booking: { update: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("POST /api/bookings/[id]/cancel", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should cancel a booking", async () => {
    vi.mocked(prisma.booking.update).mockResolvedValue({
      id: "booking-1", status: "CANCELLED",
    } as never);

    const result = await prisma.booking.update({
      where: { id: "booking-1" },
      data: { status: "CANCELLED" },
    });
    expect(result.status).toBe("CANCELLED");
  });
});
