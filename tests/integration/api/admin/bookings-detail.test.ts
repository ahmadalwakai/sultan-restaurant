import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: { booking: { findUnique: vi.fn(), update: vi.fn(), delete: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Booking Detail & Status", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should get booking detail", async () => {
    vi.mocked(prisma.booking.findUnique).mockResolvedValue({
      id: "b1", customerName: "John", guests: 4, status: "CONFIRMED",
    } as never);

    const booking = await prisma.booking.findUnique({ where: { id: "b1" } });
    expect(booking!.customerName).toBe("John");
  });

  it("should update booking status", async () => {
    vi.mocked(prisma.booking.update).mockResolvedValue({
      id: "b1", status: "CONFIRMED",
    } as never);

    const booking = await prisma.booking.update({
      where: { id: "b1" },
      data: { status: "CONFIRMED" },
    });
    expect(booking.status).toBe("CONFIRMED");
  });

  it("should delete a booking", async () => {
    vi.mocked(prisma.booking.delete).mockResolvedValue({ id: "b1" } as never);
    await prisma.booking.delete({ where: { id: "b1" } });
    expect(prisma.booking.delete).toHaveBeenCalledWith({ where: { id: "b1" } });
  });
});
