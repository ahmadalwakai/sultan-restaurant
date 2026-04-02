"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { ComboPublic } from "@/types/combo";

interface ComboCardProps {
  combo: ComboPublic;
}

export function ComboCard({ combo }: ComboCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[16/10]">
        {combo.image ? (
          <Image src={combo.image} alt={combo.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 text-5xl">🍱</div>
        )}
        {combo.savings > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            Save {formatCurrency(combo.savings)}
          </div>
        )}
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700">
          Serves {combo.servesCount}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{combo.name}</h3>
        {combo.description && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{combo.description}</p>}
        <div className="mt-2 text-xs text-gray-400">
          {combo.items.map((item) => `${item.quantity}× ${item.menuItemName}`).join(" • ")}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-600">{formatCurrency(combo.price)}</span>
            {combo.originalPrice > combo.price && (
              <span className="text-sm text-gray-400 line-through">{formatCurrency(combo.originalPrice)}</span>
            )}
          </div>
          <Link href="/menu" className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600">
            Order
          </Link>
        </div>
      </div>
    </div>
  );
}
