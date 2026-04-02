"use client";

import { useQuery } from "@tanstack/react-query";

export function useAdminErrors(filters?: { severity?: string; path?: string; page?: number }) {
  const params = new URLSearchParams();
  if (filters?.severity) params.set("severity", filters.severity);
  if (filters?.path) params.set("path", filters.path);
  if (filters?.page) params.set("page", String(filters.page));

  const logsQuery = useQuery({
    queryKey: ["admin", "monitoring", "errors", filters],
    queryFn: async () => {
      const res = await fetch(`/api/admin/monitoring/errors?${params}`);
      if (!res.ok) throw new Error("Failed to fetch error logs");
      const json = await res.json();
      return json.data;
    },
    staleTime: 30_000,
  });

  const statsQuery = useQuery({
    queryKey: ["admin", "monitoring", "errors", "stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/monitoring/errors?view=stats");
      if (!res.ok) throw new Error("Failed to fetch error stats");
      const json = await res.json();
      return json.data;
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  return { logs: logsQuery, stats: statsQuery };
}
