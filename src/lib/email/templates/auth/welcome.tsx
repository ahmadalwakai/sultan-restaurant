import { EmailLayout } from "../shared/EmailLayout";
import { emailButton } from "../shared/EmailButton";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export function welcomeEmail(name: string) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Welcome, ${name}!</h2><p style="color:#666;line-height:1.6">Thank you for joining Sultan Restaurant. We're delighted to have you!</p><p style="color:#666;line-height:1.6">Browse our menu and place your first order, or book a table for a memorable dining experience.</p>${emailButton("View Our Menu", `${baseUrl}/menu`)}</td></tr>` });
}
