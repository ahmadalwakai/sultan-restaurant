"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { MenuItemPublic } from "@/types/menu";

interface MobileMenuItemCardSwipeProps {
  item: MenuItemPublic;
  onAddToCart?: () => void;
  onClick?: () => void;
}

export function MobileMenuItemCardSwipe({ item, onAddToCart, onClick }: MobileMenuItemCardSwipeProps) {
  const [offsetX, setOffsetX] = useState(0);
  const startX = useRef(0);
  const swiping = useRef(false);

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    swiping.current = true;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!swiping.current) return;
    const diff = e.touches[0].clientX - startX.current;
    setOffsetX(Math.max(-80, Math.min(0, diff)));
  }

  function handleTouchEnd() {
    swiping.current = false;
    if (offsetX < -40) {
      setOffsetX(-80);
    } else {
      setOffsetX(0);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Swipe action behind */}
      <div className="absolute right-0 top-0 flex h-full w-20 items-center justify-center bg-amber-500">
        <button onClick={onAddToCart} className="text-xl text-white" aria-label="Add to cart">🛒</button>
      </div>
      {/* Main card */}
      <div
        className="relative flex gap-3 bg-white p-3 transition-transform"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={onClick}
      >
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
          {item.image ? (
            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-amber-50 text-3xl">🍛</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-gray-900">{item.name}</p>
          {item.description && <p className="mt-0.5 truncate text-xs text-gray-400">{item.description}</p>}
          <p className="mt-1 font-bold text-amber-600">{formatCurrency(item.price)}</p>
        </div>
      </div>
    </div>
  );
}
