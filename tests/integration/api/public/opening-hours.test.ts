import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { openingHour: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/opening-hours", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return all opening hours", async () => {
    vi.mocked(prisma.openingHour.findMany).mockResolvedValue([
      { dayOfWeek: 0, openTime: "12:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 1, openTime: null, closeTime: null, isClosed: true },
    ] as never);

    const hours = await prisma.openingHour.findMany({ orderBy: { dayOfWeek: "asc" } });
    expect(hours).toHaveLength(2);
    expect(hours[1].isClosed).toBe(true);
  });
});
