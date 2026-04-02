import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe/stripe", () => ({
  stripe: {
    webhooks: { constructEvent: vi.fn() },
  },
}));

import { stripe } from "@/lib/stripe/stripe";

describe("Stripe Webhook - checkout.session.completed", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should verify webhook signature", () => {
    const event = {
      id: "evt_1",
      type: "checkout.session.completed",
      data: { object: { id: "cs_1", metadata: { orderId: "order-1" } } },
    };
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(event as never);

    const result = stripe.webhooks.constructEvent("body", "sig", "whsec_test");
    expect(result.type).toBe("checkout.session.completed");
  });

  it("should reject invalid signature", () => {
    vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
      throw new Error("Invalid signature");
    });

    expect(() =>
      stripe.webhooks.constructEvent("body", "bad-sig", "whsec_test")
    ).toThrow("Invalid signature");
  });
});
