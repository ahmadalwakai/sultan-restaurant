import { sendEmail } from "../send-email";
import { buildOrderReadyEmail } from "../builders/order-email";
import type { OrderEmailData } from "../email-types";

export async function sendOrderReady(data: OrderEmailData) {
  return sendEmail(buildOrderReadyEmail(data));
}
