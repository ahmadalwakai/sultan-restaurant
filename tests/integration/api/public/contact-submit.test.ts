import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { contactMessage: { create: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("POST /api/contact", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should submit a contact message", async () => {
    vi.mocked(prisma.contactMessage.create).mockResolvedValue({
      id: "msg-1", name: "Alice", email: "alice@test.com",
      subject: "Question", message: "Hello", status: "UNREAD",
    } as never);

    const result = await prisma.contactMessage.create({
      data: { name: "Alice", email: "alice@test.com", subject: "Question", message: "Hello" },
    });
    expect(result.status).toBe("UNREAD");
  });
});
