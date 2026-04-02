import { sendEmail } from "../send-email";
import { buildOrderCancelledEmail } from "../builders/order-email";
import type { OrderEmailData } from "../email-types";

export async function sendOrderCancelled(data: OrderEmailData) {
  return sendEmail(buildOrderCancelledEmail(data));
}
