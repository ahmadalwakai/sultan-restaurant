"use client";
import { useMemo } from "react";
import { useCartStore } from "@/lib/cart";
import { ORDER_CONFIG } from "@/lib/constants/site";

export function useValidateCart() {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);

  const validation = useMemo(() => {
    const total = getTotal();
    const isEmpty = items.length === 0;
    const isBelowMinimum = total < ORDER_CONFIG.minOrderAmount * 100;
    const isValid = !isEmpty && !isBelowMinimum;
    return {
      isValid,
      isEmpty,
      isBelowMinimum,
      total,
      itemCount: items.length,
      minOrderAmount: ORDER_CONFIG.minOrderAmount,
    };
  }, [items, getTotal]);

  return validation;
}
