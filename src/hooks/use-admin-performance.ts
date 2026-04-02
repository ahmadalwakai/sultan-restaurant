"use client";

import { useQuery } from "@tanstack/react-query";

export function useAdminPerformance(filters?: { type?: string; path?: string; minDuration?: number; page?: number }) {
  const params = new URLSearchParams();
  if (filters?.type) params.set("type", filters.type);
  if (filters?.path) params.set("path", filters.path);
  if (filters?.minDuration) params.set("minDuration", String(filters.minDuration));
  if (filters?.page) params.set("page", String(filters.page));

  const logsQuery = useQuery({
    queryKey: ["admin", "monitoring", "performance", filters],
    queryFn: async () => {
      const res = await fetch(`/api/admin/monitoring/performance?${params}`);
      if (!res.ok) throw new Error("Failed to fetch performance logs");
      const json = await res.json();
      return json.data;
    },
    staleTime: 30_000,
  });

  const statsQuery = useQuery({
    queryKey: ["admin", "monitoring", "performance", "stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/monitoring/performance?view=stats");
      if (!res.ok) throw new Error("Failed to fetch performance stats");
      const json = await res.json();
      return json.data;
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  return { logs: logsQuery, stats: statsQuery };
}
