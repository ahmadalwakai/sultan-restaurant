"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { OrderItemPublic } from "@/types/order";

interface OrderItemCardProps {
  item: OrderItemPublic;
}

export function OrderItemCard({ item }: OrderItemCardProps) {
  const displayName = item.menuItemName || item.name;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-lg">
        🍽️
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900">{displayName}</p>
        <p className="text-sm text-gray-400">Qty: {item.quantity} × {formatCurrency(item.price)}</p>
      </div>
      <span className="shrink-0 font-semibold text-gray-900">{formatCurrency(item.subtotal)}</span>
    </div>
  );
}
