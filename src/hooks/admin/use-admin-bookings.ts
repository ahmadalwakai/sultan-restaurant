"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import type { ApiResponse, PaginationMeta } from "@/types/common";

export function useAdminBookings(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  return useQuery({
    queryKey: [...adminQueryKeys.bookings.all, params],
    queryFn: async () => {
      const res = await fetch(`/api/admin/bookings${query ? `?${query}` : ""}`);
      const json: ApiResponse<unknown[]> & { meta?: PaginationMeta } = await res.json();
      if (!json.success) throw new Error(json.error);
      return { bookings: json.data, meta: json.meta };
    },
  });
}

export function useUpdateBookingStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/admin/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.bookings.all }),
  });
}
