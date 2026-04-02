"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import type { ApiResponse } from "@/types/common";

export function useAdminOffers() {
  return useQuery({
    queryKey: adminQueryKeys.offers.all,
    queryFn: async () => {
      const res = await fetch("/api/admin/offers");
      const json: ApiResponse<unknown[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}

export function useCreateOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch("/api/admin/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.offers.all }),
  });
}

export function useUpdateOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
      const res = await fetch(`/api/admin/offers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.offers.all }),
  });
}

export function useDeleteOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.offers.all }),
  });
}
