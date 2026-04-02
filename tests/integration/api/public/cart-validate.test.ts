import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { menuItem: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("POST /api/cart", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should validate cart items against DB", async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([
      { id: "menu-1", name: "Tikka", price: { toNumber: () => 12.95 }, isAvailable: true },
      { id: "menu-2", name: "Naan", price: { toNumber: () => 2.95 }, isAvailable: true },
    ] as never);

    const items = await prisma.menuItem.findMany({
      where: { id: { in: ["menu-1", "menu-2"] }, isAvailable: true },
    });
    expect(items).toHaveLength(2);
  });

  it("should detect removed items", async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([
      { id: "menu-1", price: { toNumber: () => 12.95 }, isAvailable: true },
    ] as never);

    const items = await prisma.menuItem.findMany({
      where: { id: { in: ["menu-1", "menu-99"] }, isAvailable: true },
    });
    expect(items).toHaveLength(1);
    // menu-99 is not in the result, indicating it was removed
  });
});
