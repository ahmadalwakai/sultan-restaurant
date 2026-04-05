"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

export interface OrderAvailability {
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  pickupPauseMessage: string | null;
  deliveryPauseMessage: string | null;
}

export function useOrderAvailability() {
  return useQuery({
    queryKey: queryKeys.orderAvailability,
    queryFn: async (): Promise<OrderAvailability> => {
      const res = await fetch("/api/order-availability");
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    staleTime: 30000, // 30 seconds - check more frequently
    refetchInterval: 60000, // Refetch every minute
  });
}
