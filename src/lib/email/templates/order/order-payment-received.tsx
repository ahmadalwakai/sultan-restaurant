import { EmailLayout } from "../shared/EmailLayout";
import type { OrderEmailData } from "@/lib/email/email-types";

export function orderPaymentReceivedEmail(data: Pick<OrderEmailData, "customerName" | "orderNumber" | "total">) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Payment Received \uD83D\uDCB3</h2><p style="color:#666">Hi ${data.customerName}, we've received your payment of \u00a3${data.total.toFixed(2)} for order #${data.orderNumber}.</p><p style="color:#666">Your order will be prepared shortly.</p></td></tr>` });
}
