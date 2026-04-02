"use client";
import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import type { DashboardStats } from "@/types/admin";
import type { ApiResponse } from "@/types/common";

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminQueryKeys.dashboard,
    queryFn: async () => {
      const res = await fetch("/api/admin/dashboard");
      const json: ApiResponse<DashboardStats> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
