// ─── Slow Query Detector ─────────────────────────────────

import { logPerformance } from "../logging";
import type { DbTiming } from "./performance-types";

const DEFAULT_SLOW_QUERY_THRESHOLD_MS = 1000;

export function detectSlowQuery(
  timing: DbTiming,
  thresholdMs = DEFAULT_SLOW_QUERY_THRESHOLD_MS,
): boolean {
  if (timing.durationMs > thresholdMs) {
    logPerformance({
      operation: `slow_query:${timing.model ?? "unknown"}.${timing.operation ?? "query"}`,
      durationMs: timing.durationMs,
      metadata: {
        query: timing.query.slice(0, 200),
        threshold: thresholdMs,
      },
    });
    return true;
  }
  return false;
}
