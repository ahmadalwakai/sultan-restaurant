export function emailOrderTable(items: Array<{ name: string; quantity: number; price: number }>, subtotal: number, discount: number, total: number) {
  const rows = items.map((i) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${i.name} x${i.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">\u00a3${(i.price * i.quantity).toFixed(2)}</td></tr>`).join("");
  const discountRow = discount > 0 ? `<tr><td style="padding:8px 0">Discount</td><td style="padding:8px 0;text-align:right;color:#16a34a">-\u00a3${discount.toFixed(2)}</td></tr>` : "";
  return `<table width="100%" style="font-size:14px">${rows}<tr><td style="padding:8px 0">Subtotal</td><td style="padding:8px 0;text-align:right">\u00a3${subtotal.toFixed(2)}</td></tr>${discountRow}<tr><td style="padding:8px 0;font-weight:bold">Total</td><td style="padding:8px 0;text-align:right;font-weight:bold">\u00a3${total.toFixed(2)}</td></tr></table>`;
}
