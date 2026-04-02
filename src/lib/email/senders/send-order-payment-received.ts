import { sendEmail } from "../send-email";
import { buildOrderPaymentReceivedEmail } from "../builders/order-email";
import type { OrderEmailData } from "../email-types";

export async function sendOrderPaymentReceived(data: OrderEmailData) {
  return sendEmail(buildOrderPaymentReceivedEmail(data));
}
