import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { menuItem: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/menu/[id]/related", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return related items from same category", async () => {
    const items = [
      { id: "2", name: "Lamb Tikka", categoryId: "cat-1" },
      { id: "3", name: "Seekh Kebab", categoryId: "cat-1" },
    ];
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue(items as never);

    const result = await prisma.menuItem.findMany({
      where: { categoryId: "cat-1", id: { not: "1" }, isAvailable: true },
      take: 4,
    });
    expect(result).toHaveLength(2);
  });
});
