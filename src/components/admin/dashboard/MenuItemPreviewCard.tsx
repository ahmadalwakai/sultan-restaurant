"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";

interface MenuItemPreviewCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    image?: string | null;
    isAvailable: boolean;
    categoryName?: string;
  };
  onToggleAvailability?: (id: string) => void;
}

export function MenuItemPreviewCard({ item, onToggleAvailability }: MenuItemPreviewCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-amber-50 text-2xl">🍛</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900">{item.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-amber-600">{formatCurrency(item.price)}</span>
          {item.categoryName && <span className="text-xs text-gray-400">• {item.categoryName}</span>}
        </div>
      </div>
      {onToggleAvailability && (
        <button
          onClick={() => onToggleAvailability(item.id)}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {item.isAvailable ? "Available" : "Unavailable"}
        </button>
      )}
    </div>
  );
}
