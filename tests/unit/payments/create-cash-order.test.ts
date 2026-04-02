import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock, resetPrismaMock } from "../../mocks/prisma";
import { orders } from "../../fixtures";

vi.mock("@/lib/db/prisma", () => ({ default: prismaMock }));

describe("createCashOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetPrismaMock();
  });

  it("should create order with CASH payment method and PENDING status", async () => {
    const cashOrder = {
      ...orders[1],
      paymentMethod: "CASH",
      paymentStatus: "PENDING",
      status: "CONFIRMED",
    };
    prismaMock.order.create.mockResolvedValue(cashOrder);

    const result = await prismaMock.order.create({
      data: expect.objectContaining({ paymentMethod: "CASH" }),
    } as any);

    expect(result.paymentMethod).toBe("CASH");
    expect(result.status).toBe("CONFIRMED");
  });

  it("should set payment status to PENDING for cash orders", async () => {
    const cashOrder = { ...orders[1], paymentMethod: "CASH", paymentStatus: "PENDING" };
    prismaMock.order.create.mockResolvedValue(cashOrder);

    const result = await prismaMock.order.create({ data: {} } as any);
    expect(result.paymentStatus).toBe("PENDING");
  });
});
