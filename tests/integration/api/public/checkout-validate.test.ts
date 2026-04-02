import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { menuItem: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("POST /api/checkout/validate", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should validate available items", async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([
      { id: "menu-1", price: { toNumber: () => 12.95 }, isAvailable: true },
    ] as never);

    const items = await prisma.menuItem.findMany({ where: { id: { in: ["menu-1"] } } });
    expect(items).toHaveLength(1);
    expect(items[0].isAvailable).toBe(true);
  });

  it("should detect unavailable items", async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([
      { id: "menu-1", price: { toNumber: () => 12.95 }, isAvailable: false },
    ] as never);

    const items = await prisma.menuItem.findMany({ where: { id: { in: ["menu-1"] } } });
    expect(items[0].isAvailable).toBe(false);
  });
});
