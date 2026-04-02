"use client";

import { useQuery } from "@tanstack/react-query";

export function useAdminLogs(filters?: { adminId?: string; action?: string; entity?: string; page?: number }) {
  const params = new URLSearchParams();
  if (filters?.adminId) params.set("adminId", filters.adminId);
  if (filters?.action) params.set("action", filters.action);
  if (filters?.entity) params.set("entity", filters.entity);
  if (filters?.page) params.set("page", String(filters.page));

  return useQuery({
    queryKey: ["admin", "monitoring", "logs", filters],
    queryFn: async () => {
      const res = await fetch(`/api/admin/monitoring/logs?${params}`);
      if (!res.ok) throw new Error("Failed to fetch audit logs");
      const json = await res.json();
      return json.data;
    },
    staleTime: 30_000,
  });
}
