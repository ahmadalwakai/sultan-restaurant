"use client";
import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import type { ApiResponse, PaginationMeta } from "@/types/common";

export function useAdminCustomers(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  return useQuery({
    queryKey: [...adminQueryKeys.customers.all, params],
    queryFn: async () => {
      const res = await fetch(`/api/admin/customers${query ? `?${query}` : ""}`);
      const json: ApiResponse<unknown[]> & { meta?: PaginationMeta } = await res.json();
      if (!json.success) throw new Error(json.error);
      return { customers: json.data, meta: json.meta };
    },
  });
}
