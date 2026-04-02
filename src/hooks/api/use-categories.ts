import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { CategoryPublic } from "@/types/category";
import type { ApiResponse } from "@/types/common";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const res = await fetch("/api/categories");
      const json: ApiResponse<CategoryPublic[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
