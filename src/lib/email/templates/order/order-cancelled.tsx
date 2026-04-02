import { EmailLayout } from "../shared/EmailLayout";
import type { OrderEmailData } from "@/lib/email/email-types";

export function orderCancelledEmail(data: Pick<OrderEmailData, "customerName" | "orderNumber">) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Order Cancelled</h2><p style="color:#666">Hi ${data.customerName}, your order #${data.orderNumber} has been cancelled.</p><p style="color:#666">If you have any questions, please contact us.</p></td></tr>` });
}
