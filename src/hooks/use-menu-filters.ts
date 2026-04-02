"use client";
import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "./use-debounce";

export interface MenuFilters {
  search: string;
  categoryId: string;
  dietary: string[];
}

export function useMenuFilters() {
  const [filters, setFilters] = useState<MenuFilters>({
    search: "",
    categoryId: "",
    dietary: [],
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setCategory = useCallback((categoryId: string) => {
    setFilters((prev) => ({ ...prev, categoryId }));
  }, []);

  const toggleDietary = useCallback((tag: string) => {
    setFilters((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(tag)
        ? prev.dietary.filter((d) => d !== tag)
        : [...prev.dietary, tag],
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ search: "", categoryId: "", dietary: [] });
  }, []);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (filters.categoryId) params.categoryId = filters.categoryId;
    return params;
  }, [debouncedSearch, filters.categoryId]);

  return {
    filters,
    debouncedSearch,
    queryParams,
    setSearch,
    setCategory,
    toggleDietary,
    resetFilters,
  };
}
