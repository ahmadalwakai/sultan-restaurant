import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { OfferPublic } from "@/types/offer";
import type { ApiResponse } from "@/types/common";

export function useOffers() {
  return useQuery({
    queryKey: queryKeys.offers.active,
    queryFn: async () => {
      const res = await fetch("/api/offers/active");
      const json: ApiResponse<OfferPublic[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
