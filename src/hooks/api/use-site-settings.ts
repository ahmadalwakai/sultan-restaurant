import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { OpeningHoursEntry } from "@/types/site-settings";
import type { ApiResponse } from "@/types/common";

export function useOpeningHours() {
  return useQuery({
    queryKey: queryKeys.siteSettings.openingHours,
    queryFn: async () => {
      const res = await fetch("/api/opening-hours");
      const json: ApiResponse<OpeningHoursEntry[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
