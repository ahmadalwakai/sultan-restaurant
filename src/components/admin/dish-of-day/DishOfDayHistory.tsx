"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";

interface DishOfDayHistoryItem {
  id: string;
  date: string;
  discountPrice: number;
  reason: string | null;
  menuItem: { name: string; price: number; image?: string | null };
}

interface DishOfDayHistoryProps {
  items: DishOfDayHistoryItem[];
}

export function DishOfDayHistory({ items }: DishOfDayHistoryProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-500">Recent History</h3>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">No history yet.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                {item.menuItem.image ? (
                  <Image src={item.menuItem.image} alt={item.menuItem.name} fill className="object-cover" sizes="40px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-amber-50 text-lg">🍛</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{item.menuItem.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  {item.reason && ` • ${item.reason}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">{formatCurrency(item.discountPrice)}</p>
                <p className="text-xs text-gray-400 line-through">{formatCurrency(item.menuItem.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
