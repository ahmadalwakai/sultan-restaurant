"use client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/api/query-keys";
import type { OrderPublic } from "@/types/order";
import type { ApiResponse } from "@/types/common";

export function useOrderTracking(orderId: string) {
  return useQuery({
    queryKey: queryKeys.orders.track(orderId),
    queryFn: async () => {
      const res = await fetch(`/api/orders/${orderId}`);
      const json: ApiResponse<OrderPublic> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    enabled: !!orderId,
    refetchInterval: 30000,
  });
}
