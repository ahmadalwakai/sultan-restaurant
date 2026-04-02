import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  default: { order: { findUnique: vi.fn() } },
}));

import prisma from "@/lib/db/prisma";

describe("GET /api/orders/[id]/status", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return order status and payment status", async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue({
      id: "order-1", status: "PREPARING", paymentStatus: "PAID",
    } as never);

    const result = await prisma.order.findUnique({
      where: { id: "order-1" },
      select: { status: true, paymentStatus: true },
    });
    expect(result!.status).toBe("PREPARING");
    expect(result!.paymentStatus).toBe("PAID");
  });
});
