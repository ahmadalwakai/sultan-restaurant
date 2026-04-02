import { EmailLayout } from "../shared/EmailLayout";
import { emailOrderTable } from "../shared/EmailOrderTable";
import { emailButton } from "../shared/EmailButton";
import type { OrderEmailData } from "@/lib/email/email-types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export function orderConfirmationEmail(data: OrderEmailData) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Order Confirmed! 🎉</h2><p style="color:#666">Hi ${data.customerName}, your order #${data.orderNumber} has been confirmed.</p><p style="color:#666;font-size:14px">Order Type: ${data.orderType}${data.pickupTime ? ` | Pickup: ${data.pickupTime}` : ""}</p>${emailOrderTable(data.items, data.subtotal, data.discount, data.total)}${emailButton("Track Order", `${baseUrl}/order/${data.orderNumber}`)}</td></tr>` });
}
