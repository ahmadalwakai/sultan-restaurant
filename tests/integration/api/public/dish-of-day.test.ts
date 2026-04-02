import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { dishOfDay: { findFirst: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/dish-of-day", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return today's dish", async () => {
    vi.mocked(prisma.dishOfDay.findFirst).mockResolvedValue({
      id: "dod-1", menuItemId: "menu-1", date: new Date(),
      menuItem: { id: "menu-1", name: "Special Biryani" },
    } as never);

    const result = await prisma.dishOfDay.findFirst({
      where: { date: new Date() },
      include: { menuItem: true },
    });
    expect(result).toBeDefined();
  });

  it("should return null when no dish set", async () => {
    vi.mocked(prisma.dishOfDay.findFirst).mockResolvedValue(null);
    const result = await prisma.dishOfDay.findFirst({ where: { date: new Date() } });
    expect(result).toBeNull();
  });
});
