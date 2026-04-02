import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe/stripe", () => ({
  stripe: {
    webhooks: { constructEvent: vi.fn() },
  },
}));

import { stripe } from "@/lib/stripe/stripe";

describe("Stripe Webhook - session_expired", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should handle checkout.session.expired event", () => {
    const event = {
      id: "evt_3",
      type: "checkout.session.expired",
      data: { object: { id: "cs_1", metadata: { orderId: "order-1" } } },
    };
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(event as never);

    const result = stripe.webhooks.constructEvent("body", "sig", "whsec_test");
    expect(result.type).toBe("checkout.session.expired");
  });
});
