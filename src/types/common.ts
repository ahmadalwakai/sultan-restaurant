export type ApiResponse<T = unknown> = {
  success: true;
  data: T;
  meta?: PaginationMeta;
} | {
  success: false;
  error: string;
  code?: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type SortParams = {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type SearchParams = {
  search?: string;
};

export type StatusFilter<T extends string> = {
  status?: T;
};

export type DateRange = {
  from?: Date;
  to?: Date;
};
