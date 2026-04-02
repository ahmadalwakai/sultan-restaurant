export function emailMapLink(address: string, mapUrl?: string) {
  const url = mapUrl ?? `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  return `<a href="${url}" style="color:#d97706;text-decoration:underline;font-size:14px">${address} \u2192 View Map</a>`;
}
