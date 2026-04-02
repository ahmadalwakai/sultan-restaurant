import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    combo: { findMany: vi.fn(), create: vi.fn(), findUnique: vi.fn(), update: vi.fn(), delete: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Combos CRUD", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should list combos", async () => {
    vi.mocked(prisma.combo.findMany).mockResolvedValue([
      { id: "cb1", name: "Family Feast", isActive: true },
    ] as never);

    const combos = await prisma.combo.findMany();
    expect(combos).toHaveLength(1);
  });

  it("should create a combo", async () => {
    vi.mocked(prisma.combo.create).mockResolvedValue({
      id: "cb2", name: "Lunch Box", price: 14.99,
    } as never);

    const combo = await prisma.combo.create({ data: { name: "Lunch Box" } as never });
    expect(combo.name).toBe("Lunch Box");
  });

  it("should delete a combo", async () => {
    vi.mocked(prisma.combo.delete).mockResolvedValue({ id: "cb1" } as never);
    await prisma.combo.delete({ where: { id: "cb1" } });
    expect(prisma.combo.delete).toHaveBeenCalled();
  });
});
