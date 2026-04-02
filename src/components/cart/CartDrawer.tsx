"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/lib/cart";
import { CartItemRow } from "./CartItemRow";
import { formatCurrency } from "@/lib/utils/format-currency";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-heading text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-600"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <span className="text-5xl">🛒</span>
            <p className="mt-4 text-lg font-medium text-gray-600">Your cart is empty</p>
            <p className="mt-1 text-sm text-gray-400">Add some delicious items!</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-amber-500 px-6 py-2.5 font-semibold text-white hover:bg-amber-600"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItemRow key={item.menuItemId} item={item} />
                ))}
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-lg font-bold">
                  {formatCurrency(getTotal() / 100)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Clear
                </button>
                <Link
                  href="/pickup"
                  onClick={onClose}
                  className="flex-[2] rounded-lg bg-amber-500 py-2.5 text-center text-sm font-semibold text-white hover:bg-amber-600"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
