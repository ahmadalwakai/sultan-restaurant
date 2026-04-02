"use client";

import { useQuery } from "@tanstack/react-query";

export function useAdminAlerts(limit = 20) {
  return useQuery({
    queryKey: ["admin", "monitoring", "alerts", limit],
    queryFn: async () => {
      const res = await fetch(`/api/admin/monitoring/alerts?limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch alerts");
      const json = await res.json();
      return json.data;
    },
    refetchInterval: 30_000,
    staleTime: 10_000,
  });
}
