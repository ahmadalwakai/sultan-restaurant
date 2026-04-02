import { useMutation } from "@tanstack/react-query";
import type { CreateOrderInput, OrderPublic } from "@/types/order";
import type { ApiResponse } from "@/types/common";

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: CreateOrderInput) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: ApiResponse<OrderPublic> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
