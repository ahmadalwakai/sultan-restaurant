import { sendEmail } from "../send-email";
import { buildOrderAdminAlertEmail } from "../builders/order-email";
import type { OrderEmailData } from "../email-types";

export async function sendOrderAdminAlert(data: OrderEmailData) {
  return sendEmail(buildOrderAdminAlertEmail(data));
}
