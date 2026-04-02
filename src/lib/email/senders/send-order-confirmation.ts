import { sendEmail } from "../send-email";
import { buildOrderConfirmationEmail } from "../builders/order-email";
import type { OrderEmailData } from "../email-types";

export async function sendOrderConfirmation(data: OrderEmailData) {
  return sendEmail(buildOrderConfirmationEmail(data));
}
