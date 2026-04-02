import { EmailLayout } from "../shared/EmailLayout";
import type { OrderEmailData } from "@/lib/email/email-types";

export function orderReadyEmail(data: Pick<OrderEmailData, "customerName" | "orderNumber">) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Your Order is Ready! \u2705</h2><p style="color:#666">Hi ${data.customerName}, your order #${data.orderNumber} is ready for pickup.</p><p style="color:#666;font-weight:bold">Please collect your order at your earliest convenience.</p></td></tr>` });
}
