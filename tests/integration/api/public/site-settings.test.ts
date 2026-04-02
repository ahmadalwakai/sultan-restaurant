import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { siteSetting: { findMany: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/site-settings", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return all site settings", async () => {
    vi.mocked(prisma.siteSetting.findMany).mockResolvedValue([
      { key: "siteName", value: "Sultan Restaurant", group: "general" },
      { key: "phone", value: "+44 141 391 8883", group: "contact" },
    ] as never);

    const settings = await prisma.siteSetting.findMany();
    expect(settings).toHaveLength(2);
  });

  it("should filter by group", async () => {
    vi.mocked(prisma.siteSetting.findMany).mockResolvedValue([
      { key: "phone", value: "+44 141 391 8883", group: "contact" },
    ] as never);

    const settings = await prisma.siteSetting.findMany({ where: { group: "contact" } });
    expect(settings).toHaveLength(1);
  });
});
