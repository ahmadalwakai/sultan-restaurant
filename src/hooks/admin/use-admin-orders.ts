"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import type { ApiResponse, PaginationMeta } from "@/types/common";

export function useAdminOrders(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  return useQuery({
    queryKey: [...adminQueryKeys.orders.all, params],
    queryFn: async () => {
      const res = await fetch(`/api/admin/orders${query ? `?${query}` : ""}`);
      const json: ApiResponse<unknown[]> & { meta?: PaginationMeta } = await res.json();
      if (!json.success) throw new Error(json.error);
      return { orders: json.data, meta: json.meta };
    },
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/admin/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.orders.all }),
  });
}
