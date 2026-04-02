// ─── Response Logger ─────────────────────────────────────

import { logger } from "./logger";

export function logResponse(params: {
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
  requestId: string;
}): void {
  const level = params.statusCode >= 500 ? "error" : params.statusCode >= 400 ? "warn" : "info";
  logger[level](`← ${params.statusCode} ${params.method} ${params.path} ${params.durationMs}ms`, {
    statusCode: params.statusCode,
    durationMs: params.durationMs,
    requestId: params.requestId,
  });
}
