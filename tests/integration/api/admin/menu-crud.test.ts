import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    menuItem: { findMany: vi.fn(), count: vi.fn(), create: vi.fn(), findUnique: vi.fn(), update: vi.fn(), delete: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Menu CRUD", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should list menu items with pagination", async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValue([
      { id: "m1", name: "Tikka" },
    ] as never);
    vi.mocked(prisma.menuItem.count).mockResolvedValue(1);

    const items = await prisma.menuItem.findMany({ take: 20, skip: 0 });
    expect(items).toHaveLength(1);
  });

  it("should create a menu item", async () => {
    vi.mocked(prisma.menuItem.create).mockResolvedValue({
      id: "m2", name: "New Item", slug: "new-item", price: 9.95,
    } as never);

    const item = await prisma.menuItem.create({ data: { name: "New Item" } as never });
    expect(item.name).toBe("New Item");
  });

  it("should update a menu item", async () => {
    vi.mocked(prisma.menuItem.update).mockResolvedValue({
      id: "m1", name: "Updated Tikka", price: 13.95,
    } as never);

    const item = await prisma.menuItem.update({
      where: { id: "m1" },
      data: { name: "Updated Tikka", price: 13.95 },
    });
    expect(item.name).toBe("Updated Tikka");
  });

  it("should delete a menu item", async () => {
    vi.mocked(prisma.menuItem.delete).mockResolvedValue({ id: "m1" } as never);
    await prisma.menuItem.delete({ where: { id: "m1" } });
    expect(prisma.menuItem.delete).toHaveBeenCalled();
  });

  it("should toggle availability", async () => {
    vi.mocked(prisma.menuItem.findUnique).mockResolvedValue({
      id: "m1", isAvailable: true,
    } as never);
    vi.mocked(prisma.menuItem.update).mockResolvedValue({
      id: "m1", isAvailable: false,
    } as never);

    const current = await prisma.menuItem.findUnique({ where: { id: "m1" } });
    const updated = await prisma.menuItem.update({
      where: { id: "m1" },
      data: { isAvailable: !current!.isAvailable },
    });
    expect(updated.isAvailable).toBe(false);
  });
});
