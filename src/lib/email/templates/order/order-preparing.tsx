import { EmailLayout } from "../shared/EmailLayout";
import type { OrderEmailData } from "@/lib/email/email-types";

export function orderPreparingEmail(data: Pick<OrderEmailData, "customerName" | "orderNumber">) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Your Order is Being Prepared \uD83D\uDC68\u200D\uD83C\uDF73</h2><p style="color:#666">Hi ${data.customerName}, we're now preparing your order #${data.orderNumber}.</p><p style="color:#666">We'll let you know when it's ready!</p></td></tr>` });
}
