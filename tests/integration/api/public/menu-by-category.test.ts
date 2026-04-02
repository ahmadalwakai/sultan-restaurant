import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: {
    category: { findFirst: vi.fn() },
    menuItem: { findMany: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/menu/by-category/[slug]", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return category with its menu items", async () => {
    const category = { id: "cat-1", name: "Starters", slug: "starters" };
    vi.mocked(prisma.category.findFirst).mockResolvedValue(category as never);
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([
      { id: "1", name: "Samosa", categoryId: "cat-1" },
    ] as never);

    const cat = await prisma.category.findFirst({ where: { slug: "starters" } });
    expect(cat).toBeDefined();
    const items = await prisma.menuItem.findMany({ where: { categoryId: cat!.id, isAvailable: true } });
    expect(items).toHaveLength(1);
  });

  it("should return null for non-existent category", async () => {
    vi.mocked(prisma.category.findFirst).mockResolvedValue(null);
    const cat = await prisma.category.findFirst({ where: { slug: "nope" } });
    expect(cat).toBeNull();
  });
});
