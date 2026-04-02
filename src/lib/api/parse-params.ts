import { NextRequest } from "next/server";
import type { PaginationParams, SortParams } from "@/types/common";

export function parseSearchParams(req: NextRequest) {
  const url = new URL(req.url);
  return {
    get: (key: string) => url.searchParams.get(key),
    getAll: (key: string) => url.searchParams.getAll(key),
  };
}

export function parsePagination(req: NextRequest | URLSearchParams): Required<PaginationParams> & { skip: number } {
  let params: { get: (key: string) => string | null };
  if (req instanceof URLSearchParams) {
    params = { get: (key: string) => req.get(key) };
  } else {
    params = parseSearchParams(req);
  }
  const page = Math.max(1, parseInt(params.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(params.get("limit") || "12", 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function parseSort(req: NextRequest, allowedFields: string[]): SortParams {
  const params = parseSearchParams(req);
  const sortBy = params.get("sortBy") || undefined;
  const sortOrder = params.get("sortOrder") === "desc" ? "desc" : "asc";
  if (sortBy && !allowedFields.includes(sortBy)) return {};
  return { sortBy, sortOrder };
}
