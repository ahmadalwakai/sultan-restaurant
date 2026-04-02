import { EMAIL_CONFIG } from "@/lib/email/email-config";

export function EmailLayout({ children }: { children: string }) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>body{font-family:Arial,sans-serif;margin:0;padding:0;background:#f5f5f5}table{border-collapse:collapse}.container{max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden}</style></head><body><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:20px"><table class="container" width="100%">${EmailHeader()}${children}${EmailFooter()}</table></td></tr></table></body></html>`;
}

function EmailHeader() {
  return `<tr><td style="background:#d97706;padding:24px;text-align:center"><h1 style="color:#fff;margin:0;font-size:24px">${EMAIL_CONFIG.restaurantName}</h1></td></tr>`;
}

function EmailFooter() {
  return `<tr><td style="padding:24px;text-align:center;background:#fafafa;color:#666;font-size:12px"><p style="margin:4px 0">${EMAIL_CONFIG.restaurantName}</p><p style="margin:4px 0">\u00a9 ${new Date().getFullYear()} All rights reserved</p></td></tr>`;
}
