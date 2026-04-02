// ─── Trigger: Payment Failed ─────────────────────────────

import { triggerAlert } from "../alert-manager";

export async function alertPaymentFailed(params: {
  orderId?: string;
  amount?: number;
  currency?: string;
  error: string;
}) {
  return triggerAlert({
    rule: "payment-failed",
    level: "critical",
    title: "Payment Failed",
    message: `Payment processing failed: ${params.error}`,
    metadata: {
      orderId: params.orderId,
      amount: params.amount,
      currency: params.currency,
    },
  });
}
