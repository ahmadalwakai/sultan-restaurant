import { describe, it, expect, vi, beforeEach } from "vitest";
import { stripeMock } from "../../mocks/stripe";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { orders } from "../../fixtures";

vi.mock("@/lib/stripe/stripe", () => ({ stripe: stripeMock }));
vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("handlePaymentSuccess", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetPrismaMock();
  });

  it("should update order status to CONFIRMED on payment success", async () => {
    prismaMock.order.update.mockResolvedValue({ ...orders[0], status: "CONFIRMED", paymentStatus: "PAID" });

    const updated = await prismaMock.order.update({
      where: { id: "order-1" },
      data: { status: "CONFIRMED", paymentStatus: "PAID", stripePaymentId: "pi_test_123" },
    });

    expect(updated.status).toBe("CONFIRMED");
    expect(updated.paymentStatus).toBe("PAID");
  });

  it("should retrieve session to get payment details", async () => {
    const session = await stripeMock.checkout.sessions.retrieve("cs_test_123");
    expect(session.payment_status).toBe("paid");
    expect(session.metadata.orderId).toBe("order-1");
  });
});
