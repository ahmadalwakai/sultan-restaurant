export function emailSocialIcons(links: { facebook?: string; instagram?: string; twitter?: string }) {
  const icons = [];
  if (links.facebook) icons.push(`<a href="${links.facebook}" style="color:#d97706;margin:0 8px">Facebook</a>`);
  if (links.instagram) icons.push(`<a href="${links.instagram}" style="color:#d97706;margin:0 8px">Instagram</a>`);
  if (links.twitter) icons.push(`<a href="${links.twitter}" style="color:#d97706;margin:0 8px">Twitter</a>`);
  return `<div style="text-align:center;padding:8px 0">${icons.join(" | ")}</div>`;
}
