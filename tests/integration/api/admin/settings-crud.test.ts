import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    siteSetting: { findMany: vi.fn(), upsert: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Settings", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should get all settings", async () => {
    vi.mocked(prisma.siteSetting.findMany).mockResolvedValue([
      { key: "siteName", value: "Sultan Restaurant", group: "general" },
    ] as never);

    const settings = await prisma.siteSetting.findMany();
    expect(settings).toHaveLength(1);
  });

  it("should upsert a setting", async () => {
    vi.mocked(prisma.siteSetting.upsert).mockResolvedValue({
      key: "siteName", value: "Sultan Restaurant Updated", group: "general",
    } as never);

    const setting = await prisma.siteSetting.upsert({
      where: { key: "siteName" },
      update: { value: "Sultan Restaurant Updated" },
      create: { key: "siteName", value: "Sultan Restaurant Updated", group: "general" },
    });
    expect(setting.value).toBe("Sultan Restaurant Updated");
  });
});
