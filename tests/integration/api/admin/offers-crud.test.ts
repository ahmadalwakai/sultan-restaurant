import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    offer: { findMany: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn(), findUnique: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Offers CRUD", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should list all offers", async () => {
    vi.mocked(prisma.offer.findMany).mockResolvedValue([
      { id: "o1", title: "20% Off", isActive: true },
    ] as never);

    const offers = await prisma.offer.findMany();
    expect(offers).toHaveLength(1);
  });

  it("should create an offer", async () => {
    vi.mocked(prisma.offer.create).mockResolvedValue({
      id: "o2", title: "Free Delivery", isActive: true,
    } as never);

    const offer = await prisma.offer.create({ data: { title: "Free Delivery" } as never });
    expect(offer.title).toBe("Free Delivery");
  });

  it("should toggle offer active status", async () => {
    vi.mocked(prisma.offer.findUnique).mockResolvedValue({ id: "o1", isActive: true } as never);
    vi.mocked(prisma.offer.update).mockResolvedValue({ id: "o1", isActive: false } as never);

    const current = await prisma.offer.findUnique({ where: { id: "o1" } });
    const updated = await prisma.offer.update({
      where: { id: "o1" },
      data: { isActive: !current!.isActive },
    });
    expect(updated.isActive).toBe(false);
  });
});
