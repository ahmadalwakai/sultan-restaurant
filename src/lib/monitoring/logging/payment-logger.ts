// ─── Payment Logger ──────────────────────────────────────

import { logger } from "./logger";

export function logPaymentEvent(
  event: string,
  params: {
    orderId?: string;
    amount?: number;
    currency?: string;
    stripeSessionId?: string;
    error?: string;
  },
): void {
  logger.info(`PAYMENT: ${event}`, {
    payment: true,
    orderId: params.orderId,
    amount: params.amount,
    currency: params.currency,
    stripeSessionId: params.stripeSessionId,
    ...(params.error && { paymentError: params.error }),
  });
}
