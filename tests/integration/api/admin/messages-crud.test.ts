import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: {
    contactMessage: { findMany: vi.fn(), count: vi.fn(), findUnique: vi.fn(), update: vi.fn(), delete: vi.fn() },
  },
}));

import prisma from "@/lib/db/prisma";

describe("Admin Messages", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should list messages with pagination", async () => {
    vi.mocked(prisma.contactMessage.findMany).mockResolvedValue([
      { id: "m1", name: "Alice", status: "UNREAD" },
    ] as never);
    vi.mocked(prisma.contactMessage.count).mockResolvedValue(1);

    const messages = await prisma.contactMessage.findMany({ take: 20 });
    expect(messages).toHaveLength(1);
  });

  it("should mark message as read", async () => {
    vi.mocked(prisma.contactMessage.update).mockResolvedValue({
      id: "m1", status: "READ",
    } as never);

    const msg = await prisma.contactMessage.update({
      where: { id: "m1" },
      data: { status: "READ" },
    });
    expect(msg.status).toBe("READ");
  });

  it("should delete a message", async () => {
    vi.mocked(prisma.contactMessage.delete).mockResolvedValue({ id: "m1" } as never);
    await prisma.contactMessage.delete({ where: { id: "m1" } });
    expect(prisma.contactMessage.delete).toHaveBeenCalled();
  });
});
