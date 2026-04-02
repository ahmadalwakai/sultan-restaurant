import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { MenuItemPublic } from "@/types/menu";
import type { ApiResponse, PaginationMeta } from "@/types/common";

async function fetchMenu(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/menu${query ? `?${query}` : ""}`);
  const json: ApiResponse<MenuItemPublic[]> & { meta?: PaginationMeta } = await res.json();
  if (!json.success) throw new Error(json.error);
  return { items: json.data, meta: json.meta };
}

export function useMenu(params?: Record<string, string>) {
  return useQuery({
    queryKey: queryKeys.menu.list(params),
    queryFn: () => fetchMenu(params),
  });
}

export function usePopularMenu() {
  return useQuery({
    queryKey: queryKeys.menu.popular,
    queryFn: async () => {
      const res = await fetch("/api/menu/popular");
      const json: ApiResponse<MenuItemPublic[]> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
