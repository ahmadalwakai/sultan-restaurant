import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { ApiResponse } from "@/types/common";

export function useReviews() {
  return useQuery({
    queryKey: queryKeys.reviews.all,
    queryFn: async () => {
      const res = await fetch("/api/reviews");
      const json: ApiResponse<unknown[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
