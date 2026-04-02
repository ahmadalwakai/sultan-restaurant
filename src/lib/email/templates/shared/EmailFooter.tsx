import { EMAIL_CONFIG } from "@/lib/email/email-config";

export function emailFooter() {
  return `<tr><td style="padding:24px;text-align:center;background:#fafafa;color:#666;font-size:12px"><p style="margin:4px 0">${EMAIL_CONFIG.restaurantName}</p><p style="margin:4px 0">\u00a9 ${new Date().getFullYear()} All rights reserved</p></td></tr>`;
}
