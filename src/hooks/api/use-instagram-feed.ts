import { useQuery } from "@tanstack/react-query";
import type { InstagramPost } from "@/types/instagram";
import type { ApiResponse } from "@/types/common";

export function useInstagramFeed(limit?: number) {
  return useQuery({
    queryKey: ["instagram", "feed", limit],
    queryFn: async () => {
      const params = limit ? `?limit=${limit}` : "";
      const res = await fetch(`/api/instagram${params}`);
      const json: ApiResponse<InstagramPost[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
