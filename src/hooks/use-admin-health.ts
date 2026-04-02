"use client";

import { useQuery } from "@tanstack/react-query";

export function useAdminHealth() {
  return useQuery({
    queryKey: ["admin", "monitoring", "health"],
    queryFn: async () => {
      const res = await fetch("/api/admin/monitoring/health");
      if (!res.ok) throw new Error("Failed to fetch health data");
      const json = await res.json();
      return json.data;
    },
    refetchInterval: 30_000,
    staleTime: 10_000,
  });
}
