import { EmailLayout } from "../shared/EmailLayout";
import { emailOrderTable } from "../shared/EmailOrderTable";
import type { OrderEmailData } from "@/lib/email/email-types";

export function orderAdminAlertEmail(data: OrderEmailData) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">New Order Received! \uD83D\uDD14</h2><p style="color:#666">Order #${data.orderNumber} from ${data.customerName} (${data.customerEmail})</p><p style="color:#666;font-size:14px">Type: ${data.orderType}${data.pickupTime ? ` | Pickup: ${data.pickupTime}` : ""}</p>${emailOrderTable(data.items, data.subtotal, data.discount, data.total)}</td></tr>` });
}
