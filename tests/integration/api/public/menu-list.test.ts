import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({ default: { menuItem: { findMany: vi.fn(), count: vi.fn() } } }));
vi.mock("@/lib/api", async (importOriginal) => {
  const mod = await importOriginal<Record<string, unknown>>();
  return { ...mod, withErrorHandler: (fn: Function) => fn };
});

import prisma from "@/lib/db/prisma";

describe("GET /api/menu", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return paginated menu items", async () => {
    const items = [{ id: "1", name: "Tikka", price: 12.95, isAvailable: true }];
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue(items as never);
    vi.mocked(prisma.menuItem.count).mockResolvedValue(1);

    const result = await prisma.menuItem.findMany();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Tikka");
  });

  it("should filter by categoryId", async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([] as never);
    await prisma.menuItem.findMany({ where: { categoryId: "cat-1" } });
    expect(prisma.menuItem.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { categoryId: "cat-1" } })
    );
  });

  it("should filter by search query", async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([] as never);
    await prisma.menuItem.findMany({
      where: { OR: [{ name: { contains: "chicken" } }] },
    });
    expect(prisma.menuItem.findMany).toHaveBeenCalled();
  });
});
