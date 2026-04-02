import { EMAIL_CONFIG } from "../email-config";
import { EmailLayout } from "../templates/shared/EmailLayout";
import type { EmailPayload } from "../email-types";

export function buildGenericAdminAlertEmail(subject: string, message: string): EmailPayload {
  const html = EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">${subject}</h2><p style="color:#666">${message}</p></td></tr>` });
  return { to: EMAIL_CONFIG.adminEmail, subject, html, template: "admin-alert" };
}
