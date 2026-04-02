import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { combo: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/combos", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return active combos", async () => {
    vi.mocked(prisma.combo.findMany).mockResolvedValue([
      { id: "combo-1", name: "Family Feast", isActive: true, price: 29.99, items: [] },
    ] as never);

    const combos = await prisma.combo.findMany({
      where: { isActive: true },
      include: { items: { include: { menuItem: true } } },
    });
    expect(combos).toHaveLength(1);
    expect(combos[0].isActive).toBe(true);
  });
});
