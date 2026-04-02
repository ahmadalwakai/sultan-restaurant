import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe/stripe", () => ({
  stripe: {
    webhooks: { constructEvent: vi.fn() },
  },
}));

import { stripe } from "@/lib/stripe/stripe";

describe("Stripe Webhook - payment_failed", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should handle async_payment_failed event", () => {
    const event = {
      id: "evt_2",
      type: "checkout.session.async_payment_failed",
      data: { object: { id: "cs_1", metadata: { orderId: "order-1" } } },
    };
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(event as never);

    const result = stripe.webhooks.constructEvent("body", "sig", "whsec_test");
    expect(result.type).toBe("checkout.session.async_payment_failed");
    expect(result.data.object.metadata.orderId).toBe("order-1");
  });
});
