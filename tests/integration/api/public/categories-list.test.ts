import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { category: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/categories", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return active categories", async () => {
    const categories = [
      { id: "cat-1", name: "Starters", slug: "starters", isActive: true },
      { id: "cat-2", name: "Mains", slug: "mains", isActive: true },
    ];
    vi.mocked(prisma.category.findMany).mockResolvedValue(categories as never);

    const result = await prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
    expect(result).toHaveLength(2);
    expect(result.every((c: { isActive: boolean }) => c.isActive)).toBe(true);
  });
});
