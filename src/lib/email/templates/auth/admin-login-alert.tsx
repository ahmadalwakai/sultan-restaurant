import { EmailLayout } from "../shared/EmailLayout";

export function adminLoginAlertEmail(email: string, ip?: string) {
  return EmailLayout({ children: `<tr><td style="padding:24px"><h2 style="margin:0 0 16px">Admin Login Alert</h2><p style="color:#666">A login was detected on the admin panel:</p><table style="font-size:14px;margin:16px 0"><tr><td style="padding:4px 8px;color:#666">Email:</td><td style="padding:4px 8px;font-weight:bold">${email}</td></tr><tr><td style="padding:4px 8px;color:#666">Time:</td><td style="padding:4px 8px">${new Date().toLocaleString()}</td></tr>${ip ? `<tr><td style="padding:4px 8px;color:#666">IP:</td><td style="padding:4px 8px">${ip}</td></tr>` : ""}</table><p style="color:#999;font-size:12px">If this wasn&apos;t you, please secure your account immediately.</p></td></tr>` });
}
