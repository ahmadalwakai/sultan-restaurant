"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import type { ApiResponse, PaginationMeta } from "@/types/common";

export function useAdminMenu(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  return useQuery({
    queryKey: [...adminQueryKeys.menu.all, params],
    queryFn: async () => {
      const res = await fetch(`/api/admin/menu${query ? `?${query}` : ""}`);
      const json: ApiResponse<unknown[]> & { meta?: PaginationMeta } = await res.json();
      if (!json.success) throw new Error(json.error);
      return { items: json.data, meta: json.meta };
    },
  });
}

export function useCreateMenuItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/admin/menu", { method: "POST", body: data });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.menu.all }),
  });
}

export function useUpdateMenuItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await fetch(`/api/admin/menu/${id}`, { method: "PUT", body: data });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.menu.all }),
  });
}

export function useDeleteMenuItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.menu.all }),
  });
}
