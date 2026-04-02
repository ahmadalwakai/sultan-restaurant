// ─── Error Logger ────────────────────────────────────────

import { logger } from "./logger";

export function logError(
  message: string,
  error: unknown,
  extra?: Record<string, unknown>,
): void {
  const err = error instanceof Error ? error : new Error(String(error));
  logger.error(message, { ...extra, error: err });
}
