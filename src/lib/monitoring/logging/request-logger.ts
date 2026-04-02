// ─── Request Logger ──────────────────────────────────────

import { logger } from "./logger";

export function logRequest(params: {
  method: string;
  path: string;
  requestId: string;
  userAgent?: string;
  ip?: string;
}): void {
  logger.info(`→ ${params.method} ${params.path}`, {
    requestId: params.requestId,
    userAgent: params.userAgent,
    ip: params.ip,
  });
}
