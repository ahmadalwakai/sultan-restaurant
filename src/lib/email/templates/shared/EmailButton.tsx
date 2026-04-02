export function emailButton(text: string, url: string, color = "#d97706") {
  return `<table cellpadding="0" cellspacing="0" style="margin:16px 0"><tr><td style="background:${color};border-radius:6px;padding:12px 24px"><a href="${url}" style="color:#fff;text-decoration:none;font-weight:bold;font-size:14px">${text}</a></td></tr></table>`;
}
