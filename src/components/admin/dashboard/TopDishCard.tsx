"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";

interface TopDishCardProps {
  dish: {
    name: string;
    image?: string | null;
    ordersCount: number;
    revenue: number;
  };
  rank: number;
}

export function TopDishCard({ dish, rank }: TopDishCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-sm font-bold text-amber-600">
        #{rank}
      </span>
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
        {dish.image ? (
          <Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="48px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-amber-50 text-xl">🍛</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900">{dish.name}</p>
        <p className="text-xs text-gray-400">{dish.ordersCount} orders</p>
      </div>
      <span className="shrink-0 font-semibold text-gray-900">{formatCurrency(dish.revenue)}</span>
    </div>
  );
}
