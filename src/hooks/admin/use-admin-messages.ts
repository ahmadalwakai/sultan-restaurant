"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import type { ApiResponse } from "@/types/common";

export function useAdminMessages(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  return useQuery({
    queryKey: [...adminQueryKeys.messages.all, params],
    queryFn: async () => {
      const res = await fetch(`/api/admin/messages${query ? `?${query}` : ""}`);
      const json: ApiResponse<unknown[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}

export function useMarkMessageRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/messages/${id}/read`, { method: "PATCH" });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.messages.all }),
  });
}

export function useDeleteMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.messages.all }),
  });
}
