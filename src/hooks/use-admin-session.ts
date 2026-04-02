"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { AdminSession } from "@/types/auth";
import type { ApiResponse } from "@/types/common";

export function useAdminSession() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: admin, isLoading } = useQuery({
    queryKey: ["admin-session"],
    queryFn: async () => {
      const res = await fetch("/api/auth/admin/verify");
      if (!res.ok) return null;
      const json: ApiResponse<AdminSession> = await res.json();
      return json.success ? json.data : null;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const logout = async () => {
    await fetch("/api/auth/admin/logout", { method: "POST" });
    queryClient.removeQueries({ queryKey: ["admin-session"] });
    router.push("/auth/admin-login");
  };

  return { admin, isLoading, isAuthenticated: !!admin, logout };
}
