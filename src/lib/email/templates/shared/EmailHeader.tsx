import { EMAIL_CONFIG } from "@/lib/email/email-config";

export function emailHeader() {
  return `<tr><td style="background:#d97706;padding:24px;text-align:center"><h1 style="color:#fff;margin:0;font-size:24px">${EMAIL_CONFIG.restaurantName}</h1></td></tr>`;
}
