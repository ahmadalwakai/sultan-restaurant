import { sendEmail } from "../send-email";
import { buildOrderPreparingEmail } from "../builders/order-email";
import type { OrderEmailData } from "../email-types";

export async function sendOrderPreparing(data: OrderEmailData) {
  return sendEmail(buildOrderPreparingEmail(data));
}
