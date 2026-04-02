"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import type { ApiResponse } from "@/types/common";

export function useAdminSeo() {
  return useQuery({
    queryKey: adminQueryKeys.seo.all,
    queryFn: async () => {
      const res = await fetch("/api/admin/seo");
      const json: ApiResponse<unknown[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}

export function useUpdateSeo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: adminQueryKeys.seo.all }),
  });
}
