import { vi } from "vitest";

export const stripeMock = {
  checkout: {
    sessions: {
      create: vi.fn().mockResolvedValue({
        id: "cs_test_123",
        url: "https://checkout.stripe.com/test",
        payment_status: "unpaid",
        status: "open",
      }),
      retrieve: vi.fn().mockResolvedValue({
        id: "cs_test_123",
        payment_status: "paid",
        status: "complete",
        customer_email: "customer@test.com",
        amount_total: 3140,
        metadata: { orderId: "order-1" },
      }),
      expire: vi.fn().mockResolvedValue({ id: "cs_test_123", status: "expired" }),
    },
  },
  refunds: {
    create: vi.fn().mockResolvedValue({
      id: "re_test_123",
      amount: 3140,
      status: "succeeded",
    }),
  },
  webhooks: {
    constructEvent: vi.fn().mockReturnValue({
      id: "evt_test_123",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_123",
          payment_status: "paid",
          metadata: { orderId: "order-1" },
        },
      },
    }),
  },
  paymentIntents: {
    retrieve: vi.fn().mockResolvedValue({
      id: "pi_test_123",
      status: "succeeded",
      amount: 3140,
    }),
  },
};

vi.mock("@/lib/stripe/stripe", () => ({
  stripe: stripeMock,
  default: stripeMock,
}));
