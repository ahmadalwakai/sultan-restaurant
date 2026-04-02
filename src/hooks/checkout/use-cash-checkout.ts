"use client";
import { useCreateOrder } from "@/hooks/api";
import { useCartStore } from "@/lib/cart";
import type { CreateOrderInput } from "@/types/order";

export function useCashCheckout() {
  const clearCart = useCartStore((s) => s.clearCart);
  const mutation = useCreateOrder();

  const checkout = (data: CreateOrderInput) => {
    mutation.mutate(data, {
      onSuccess: () => clearCart(),
    });
  };

  return {
    checkout,
    order: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
    isSuccess: mutation.isSuccess,
  };
}
