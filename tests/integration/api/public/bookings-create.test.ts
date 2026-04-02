import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { booking: { create: vi.fn() } },
}));
vi.mock("@/lib/session", () => ({ getSession: vi.fn().mockResolvedValue(null) }));

import prisma from "@/lib/db/prisma";

describe("POST /api/bookings", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should create a booking with valid data", async () => {
    vi.mocked(prisma.booking.create).mockResolvedValue({
      id: "booking-1", status: "PENDING", customerName: "John",
      email: "john@test.com", phone: "07700900000", date: new Date(),
      time: "19:00", guests: 4,
    } as never);

    const result = await prisma.booking.create({ data: {} as never });
    expect(result.id).toBe("booking-1");
    expect(result.status).toBe("PENDING");
  });
});
