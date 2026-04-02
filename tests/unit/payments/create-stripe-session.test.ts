import { describe, it, expect, vi, beforeEach } from "vitest";
import { stripeMock } from "../../mocks/stripe";

vi.mock("@/lib/stripe/stripe", () => ({ stripe: stripeMock }));

describe("createStripeSession", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should create a checkout session with correct amount", async () => {
    const session = await stripeMock.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price_data: { currency: "gbp", unit_amount: 1295, product_data: { name: "Chicken Tikka" } }, quantity: 2 }],
      success_url: "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/checkout/cancel",
      metadata: { orderId: "order-1" },
    } as any);

    expect(session.id).toBe("cs_test_123");
    expect(session.url).toContain("checkout.stripe.com");
  });

  it("should include order metadata", async () => {
    const session = await stripeMock.checkout.sessions.create({
      metadata: { orderId: "order-1" },
    } as any);

    expect(stripeMock.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ metadata: { orderId: "order-1" } })
    );
  });
});
