import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { ComboPublic } from "@/types/combo";
import type { ApiResponse } from "@/types/common";

export function useCombos() {
  return useQuery({
    queryKey: [...queryKeys.menu.all, "combos"],
    queryFn: async () => {
      const res = await fetch("/api/combos");
      const json: ApiResponse<ComboPublic[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
