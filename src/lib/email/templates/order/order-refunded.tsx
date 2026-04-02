import { EmailLayout } from "../shared/EmailLayout";
import type { OrderEmailData } from "@/lib/email/email-types";

export function orderRefundedEmail(data: Pick<OrderEmailData, "customerName" | "orderNumber" | "total">) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Refund Processed</h2><p style="color:#666">Hi ${data.customerName}, a refund of \u00a3${data.total.toFixed(2)} has been processed for order #${data.orderNumber}.</p><p style="color:#666">The refund should appear in your account within 5-10 business days.</p></td></tr>` });
}
