// ─── Error Context ───────────────────────────────────────

export interface ErrorContext {
  path?: string;
  method?: string;
  statusCode?: number;
  requestId?: string;
  userId?: string;
  adminId?: string;
  body?: Record<string, unknown>;
  query?: Record<string, string>;
  headers?: Record<string, string>;
}

export function buildErrorContext(params: {
  path?: string;
  method?: string;
  statusCode?: number;
  requestId?: string;
  userId?: string;
  adminId?: string;
}): ErrorContext {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined),
  ) as ErrorContext;
}
