"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import type { ApiResponse } from "@/types/common";

const DISH_OF_DAY_KEY = [...adminQueryKeys.menu.all, "dish-of-day"] as const;

export function useAdminDishOfDay() {
  return useQuery({
    queryKey: DISH_OF_DAY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/admin/dish-of-day");
      const json: ApiResponse<unknown[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}

export function useSetDishOfDay() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch("/api/admin/dish-of-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: ApiResponse<unknown> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: DISH_OF_DAY_KEY }),
  });
}
