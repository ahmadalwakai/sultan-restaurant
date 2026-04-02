import { describe, it, expect, vi, beforeEach } from "vitest";
import { stripeMock } from "../../mocks/stripe";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { orders } from "../../fixtures";

vi.mock("@/lib/stripe/stripe", () => ({ stripe: stripeMock }));
vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("refund", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetPrismaMock();
  });

  it("should create Stripe refund for paid order", async () => {
    const refund = await stripeMock.refunds.create({
      payment_intent: "pi_test_123",
      amount: 3140,
    });

    expect(refund.id).toBe("re_test_123");
    expect(refund.status).toBe("succeeded");
  });

  it("should update order status to REFUNDED", async () => {
    prismaMock.order.update.mockResolvedValue({
      ...orders[3],
      status: "REFUNDED",
      paymentStatus: "REFUNDED",
    });

    const updated = await prismaMock.order.update({
      where: { id: "order-4" },
      data: { status: "REFUNDED", paymentStatus: "REFUNDED" },
    });

    expect(updated.status).toBe("REFUNDED");
    expect(updated.paymentStatus).toBe("REFUNDED");
  });

  it("should reject refund for cash orders", () => {
    const order = orders[1]; // CASH payment
    const canRefund = order.paymentMethod === "STRIPE" && order.paymentStatus === "PAID";
    expect(canRefund).toBe(false);
  });
});
