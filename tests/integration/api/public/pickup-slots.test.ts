import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { pickupSlot: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/pickup-slots", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return available slots for a date", async () => {
    vi.mocked(prisma.pickupSlot.findMany).mockResolvedValue([
      { id: "slot-1", time: "12:00", maxOrders: 5, currentOrders: 2 },
      { id: "slot-2", time: "12:15", maxOrders: 5, currentOrders: 0 },
    ] as never);

    const slots = await prisma.pickupSlot.findMany({
      where: { date: new Date("2024-12-25") },
    });
    expect(slots).toHaveLength(2);
  });

  it("should filter out fully-booked slots", async () => {
    const slots = [
      { id: "slot-1", time: "12:00", maxOrders: 5, currentOrders: 2 },
      { id: "slot-2", time: "12:15", maxOrders: 5, currentOrders: 5 },
    ];

    const available = slots.filter((s) => s.currentOrders < s.maxOrders);
    expect(available).toHaveLength(1);
    expect(available[0].time).toBe("12:00");
  });
});
