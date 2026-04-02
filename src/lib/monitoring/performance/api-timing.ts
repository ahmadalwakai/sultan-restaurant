// ─── API Timing ──────────────────────────────────────────

import type { ApiTiming } from "./performance-types";

export function measureApiTiming(
  fn: () => Promise<Response>,
  meta: { path: string; method: string },
): Promise<{ response: Response; timing: ApiTiming }> {
  const start = performance.now();
  return fn().then((response) => {
    const end = performance.now();
    return {
      response,
      timing: {
        path: meta.path,
        method: meta.method,
        statusCode: response.status,
        durationMs: Math.round(end - start),
        startTime: start,
        endTime: end,
      },
    };
  });
}

export function createApiTimer(path: string, method: string) {
  const start = performance.now();
  return {
    stop(statusCode?: number): ApiTiming {
      const end = performance.now();
      return {
        path,
        method,
        statusCode,
        durationMs: Math.round(end - start),
        startTime: start,
        endTime: end,
      };
    },
  };
}
