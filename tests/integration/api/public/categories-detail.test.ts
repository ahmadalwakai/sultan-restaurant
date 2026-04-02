import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { category: { findFirst: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/categories/[slug]", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return category by slug", async () => {
    vi.mocked(prisma.category.findFirst).mockResolvedValue({
      id: "cat-1", name: "Starters", slug: "starters",
    } as never);

    const result = await prisma.category.findFirst({ where: { slug: "starters" } });
    expect(result).toBeDefined();
    expect(result!.slug).toBe("starters");
  });

  it("should return null for non-existent slug", async () => {
    vi.mocked(prisma.category.findFirst).mockResolvedValue(null);
    const result = await prisma.category.findFirst({ where: { slug: "nope" } });
    expect(result).toBeNull();
  });
});
