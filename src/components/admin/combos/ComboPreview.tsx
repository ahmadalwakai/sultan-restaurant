"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { ComboPublic } from "@/types/combo";

interface ComboPreviewProps {
  combo: ComboPublic;
}

export function ComboPreview({ combo }: ComboPreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {combo.image && (
        <div className="relative h-40">
          <Image src={combo.image} alt={combo.name} fill className="object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{combo.name}</h3>
        {combo.description && <p className="mt-1 text-sm text-gray-500">{combo.description}</p>}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-amber-600">{formatCurrency(combo.price)}</span>
          <span className="text-sm text-gray-400 line-through">{formatCurrency(combo.originalPrice)}</span>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
            Save {formatCurrency(combo.savings)}
          </span>
        </div>
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-500">Includes:</p>
          <ul className="mt-1 space-y-1">
            {combo.items.map((item) => (
              <li key={item.menuItemId} className="text-sm text-gray-600">
                {item.quantity}× {item.menuItemName}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2 text-xs text-gray-400">Serves {combo.servesCount}</p>
      </div>
    </div>
  );
}
