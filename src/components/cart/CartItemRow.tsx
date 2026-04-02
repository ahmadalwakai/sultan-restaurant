"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { CartItem } from "@/lib/cart";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.name}
          width={56}
          height={56}
          className="rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
          <span className="text-2xl">🍛</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{item.name}</p>
        <p className="text-sm text-amber-600 font-semibold">
          {formatCurrency(item.price / 100)}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border text-gray-600 hover:bg-gray-100"
        >
          &minus;
        </button>
        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border text-gray-600 hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeItem(item.menuItemId)}
        className="text-gray-400 hover:text-red-500"
        aria-label="Remove item"
      >
        &times;
      </button>
    </div>
  );
}
