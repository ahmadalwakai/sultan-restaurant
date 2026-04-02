import { EmailLayout } from "../shared/EmailLayout";
import type { ContactEmailData } from "@/lib/email/email-types";

export function contactAdminAlertEmail(data: ContactEmailData) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">New Contact Message</h2><table style="font-size:14px;margin:16px 0;width:100%"><tr><td style="padding:4px 0;color:#666">From:</td><td>${data.name} (${data.email})</td></tr>${data.phone ? `<tr><td style="padding:4px 0;color:#666">Phone:</td><td>${data.phone}</td></tr>` : ""}<tr><td style="padding:4px 0;color:#666">Subject:</td><td style="font-weight:bold">${data.subject}</td></tr></table><div style="background:#f9f9f9;padding:16px;border-radius:6px;font-size:14px;white-space:pre-wrap">${data.message}</div></td></tr>` });
}
