// ─── Slow API Detector ───────────────────────────────────

import { logPerformance } from "../logging";
import type { ApiTiming } from "./performance-types";

const DEFAULT_SLOW_API_THRESHOLD_MS = 3000;

export function detectSlowApi(
  timing: ApiTiming,
  thresholdMs = DEFAULT_SLOW_API_THRESHOLD_MS,
): boolean {
  if (timing.durationMs > thresholdMs) {
    logPerformance({
      operation: "slow_api",
      durationMs: timing.durationMs,
      path: timing.path,
      method: timing.method,
      metadata: {
        statusCode: timing.statusCode,
        threshold: thresholdMs,
      },
    });
    return true;
  }
  return false;
}
