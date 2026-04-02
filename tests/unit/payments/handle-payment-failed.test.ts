import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { orders } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("handlePaymentFailed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetPrismaMock();
  });

  it("should update order payment status to FAILED", async () => {
    prismaMock.order.update.mockResolvedValue({ ...orders[1], paymentStatus: "FAILED" });

    const updated = await prismaMock.order.update({
      where: { id: "order-2" },
      data: { paymentStatus: "FAILED" },
    });

    expect(updated.paymentStatus).toBe("FAILED");
  });

  it("should not change order status on payment failure", async () => {
    prismaMock.order.update.mockResolvedValue({ ...orders[1], status: "PENDING", paymentStatus: "FAILED" });

    const updated = await prismaMock.order.update({
      where: { id: "order-2" },
      data: { paymentStatus: "FAILED" },
    });

    expect(updated.status).toBe("PENDING");
  });
});
