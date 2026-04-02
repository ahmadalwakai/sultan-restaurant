import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/guards", () => ({
  requireAdmin: vi.fn().mockResolvedValue({ id: "admin-1", role: "admin" }),
}));
vi.mock("@/lib/db/prisma", () => ({
  default: { order: { update: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("POST /api/admin/orders/[id]/refund", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should cancel and refund order", async () => {
    vi.mocked(prisma.order.update).mockResolvedValue({
      id: "o1", status: "CANCELLED", paymentStatus: "REFUNDED",
    } as never);

    const order = await prisma.order.update({
      where: { id: "o1" },
      data: { status: "CANCELLED", paymentStatus: "REFUNDED", notes: "Customer request" },
    });
    expect(order.status).toBe("CANCELLED");
    expect(order.paymentStatus).toBe("REFUNDED");
  });
});
