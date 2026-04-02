import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe/stripe", () => ({
  stripe: {
    webhooks: { constructEvent: vi.fn() },
  },
}));

import { stripe } from "@/lib/stripe/stripe";

describe("Stripe Webhook - Signature Validation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should validate correct signature", () => {
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue({
      id: "evt_1", type: "checkout.session.completed",
    } as never);

    expect(() =>
      stripe.webhooks.constructEvent("payload", "valid-sig", "whsec_secret")
    ).not.toThrow();
  });

  it("should reject tampered payload", () => {
    vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
      throw new Error("Webhook signature verification failed");
    });

    expect(() =>
      stripe.webhooks.constructEvent("tampered", "sig", "whsec_secret")
    ).toThrow("signature verification failed");
  });

  it("should reject missing signature header", () => {
    vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
      throw new Error("No stripe-signature header");
    });

    expect(() =>
      stripe.webhooks.constructEvent("body", "", "whsec_secret")
    ).toThrow();
  });
});
