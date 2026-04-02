import type { CartItem } from "./cart-types";

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateDiscount(
  subtotal: number,
  discount: number,
  type: "PERCENTAGE" | "FIXED",
  maxDiscount?: number
): number {
  let amount = type === "PERCENTAGE" ? subtotal * (discount / 100) : discount;
  if (maxDiscount) amount = Math.min(amount, maxDiscount);
  return Math.min(amount, subtotal);
}
