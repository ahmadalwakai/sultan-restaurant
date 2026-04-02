"use client";

import { formatCurrency } from "@/lib/utils/format-currency";

interface OrderSummaryItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryCardProps {
  items: OrderSummaryItem[];
  subtotal: number;
  discount?: number;
  total: number;
  couponCode?: string | null;
}

export function OrderSummaryCard({ items, subtotal, discount, total, couponCode }: OrderSummaryCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-gray-900">Order Summary</h3>
      <div className="mt-4 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.quantity}× {item.name}</span>
            <span className="font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        {discount && discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">
              Discount{couponCode ? ` (${couponCode})` : ""}
            </span>
            <span className="font-medium text-green-600">-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t pt-2 text-lg font-bold">
          <span className="text-gray-900">Total</span>
          <span className="text-amber-600">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
