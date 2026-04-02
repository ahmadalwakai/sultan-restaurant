// ─── Performance Logger ──────────────────────────────────

import { logger } from "./logger";

export function logPerformance(params: {
  operation: string;
  durationMs: number;
  path?: string;
  method?: string;
  metadata?: Record<string, unknown>;
}): void {
  const level = params.durationMs > 5000 ? "warn" : "debug";
  logger[level](`PERF: ${params.operation} ${params.durationMs}ms`, {
    performance: true,
    operation: params.operation,
    durationMs: params.durationMs,
    path: params.path,
    method: params.method,
    ...params.metadata,
  });
}
