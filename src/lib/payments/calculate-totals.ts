import type { CartItem, OrderTotals } from "./types";

export function calculateTotals(items: CartItem[], discount = 0): OrderTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const clampedDiscount = Math.min(discount, subtotal);
  return { subtotal, discount: clampedDiscount, total: subtotal - clampedDiscount };
}
