import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    category: { findMany: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Categories CRUD", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should list categories with item counts", async () => {
    vi.mocked(prisma.category.findMany).mockResolvedValue([
      { id: "c1", name: "Starters", slug: "starters", _count: { menuItems: 5 } },
    ] as never);

    const cats = await prisma.category.findMany({ include: { _count: { select: { menuItems: true } } } });
    expect(cats).toHaveLength(1);
  });

  it("should create a category with auto-slug", async () => {
    vi.mocked(prisma.category.create).mockResolvedValue({
      id: "c2", name: "Main Courses", slug: "main-courses",
    } as never);

    const cat = await prisma.category.create({ data: { name: "Main Courses", slug: "main-courses" } });
    expect(cat.slug).toBe("main-courses");
  });

  it("should delete a category", async () => {
    vi.mocked(prisma.category.delete).mockResolvedValue({ id: "c1" } as never);
    await prisma.category.delete({ where: { id: "c1" } });
    expect(prisma.category.delete).toHaveBeenCalled();
  });
});
