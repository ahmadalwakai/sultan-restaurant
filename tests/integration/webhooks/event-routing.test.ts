import { describe, it, expect, vi } from "vitest";

describe("Webhook Event Routing", () => {
  const handleWebhookEvent = (event: { type: string }) => {
    switch (event.type) {
      case "checkout.session.completed":
        return "handlePaymentSuccess";
      case "checkout.session.async_payment_failed":
        return "handlePaymentFailed";
      case "checkout.session.expired":
        return "handleSessionExpired";
      default:
        return "unhandled";
    }
  };

  it("should route completed to handlePaymentSuccess", () => {
    expect(handleWebhookEvent({ type: "checkout.session.completed" })).toBe("handlePaymentSuccess");
  });

  it("should route failed to handlePaymentFailed", () => {
    expect(handleWebhookEvent({ type: "checkout.session.async_payment_failed" })).toBe("handlePaymentFailed");
  });

  it("should route expired to handleSessionExpired", () => {
    expect(handleWebhookEvent({ type: "checkout.session.expired" })).toBe("handleSessionExpired");
  });

  it("should return unhandled for unknown events", () => {
    expect(handleWebhookEvent({ type: "customer.created" })).toBe("unhandled");
  });
});
