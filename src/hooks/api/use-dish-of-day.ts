import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { DishOfDayPublic } from "@/types/dish-of-day";
import type { ApiResponse } from "@/types/common";

export function useDishOfDay() {
  return useQuery({
    queryKey: [...queryKeys.menu.all, "dish-of-day"],
    queryFn: async () => {
      const res = await fetch("/api/dish-of-day");
      const json: ApiResponse<DishOfDayPublic | null> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
