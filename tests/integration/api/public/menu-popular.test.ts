import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { menuItem: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/menu/popular", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return popular menu items", async () => {
    const items = [
      { id: "1", name: "Chicken Tikka", orderCount: 150 },
      { id: "2", name: "Biryani", orderCount: 120 },
    ];
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue(items as never);

    const result = await prisma.menuItem.findMany({
      where: { isAvailable: true },
      orderBy: { orderCount: "desc" },
      take: 8,
    });
    expect(result).toHaveLength(2);
  });
});
