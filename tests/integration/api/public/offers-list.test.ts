import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { offer: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/offers", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return active offers", async () => {
    const now = new Date();
    vi.mocked(prisma.offer.findMany).mockResolvedValue([
      { id: "offer-1", title: "20% Off", isActive: true, startDate: new Date("2024-01-01"), endDate: new Date("2030-12-31") },
    ] as never);

    const offers = await prisma.offer.findMany({
      where: { isActive: true, startDate: { lte: now }, endDate: { gte: now } },
    });
    expect(offers).toHaveLength(1);
  });
});
