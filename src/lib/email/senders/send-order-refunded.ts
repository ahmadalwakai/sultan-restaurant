import { sendEmail } from "../send-email";
import { buildOrderRefundedEmail } from "../builders/order-email";
import type { OrderEmailData } from "../email-types";

export async function sendOrderRefunded(data: OrderEmailData) {
  return sendEmail(buildOrderRefundedEmail(data));
}
