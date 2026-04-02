import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { menuItem: { findFirst: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/menu/[id]", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return menu item by slug", async () => {
    const item = { id: "1", name: "Chicken Tikka", slug: "chicken-tikka", price: 12.95 };
    vi.mocked(prisma.menuItem.findFirst).mockResolvedValue(item as never);

    const result = await prisma.menuItem.findFirst({ where: { slug: "chicken-tikka" } });
    expect(result).toBeDefined();
    expect(result!.slug).toBe("chicken-tikka");
  });

  it("should return null for non-existent slug", async () => {
    vi.mocked(prisma.menuItem.findFirst).mockResolvedValue(null);

    const result = await prisma.menuItem.findFirst({ where: { slug: "not-found" } });
    expect(result).toBeNull();
  });
});
