// ─── DB Timing ───────────────────────────────────────────

import type { DbTiming } from "./performance-types";

export function createDbTimer(query: string, model?: string, operation?: string) {
  const start = performance.now();
  return {
    stop(): DbTiming {
      const end = performance.now();
      return {
        query,
        model,
        operation,
        durationMs: Math.round(end - start),
        startTime: start,
        endTime: end,
      };
    },
  };
}

export async function measureDbQuery<T>(
  query: string,
  fn: () => Promise<T>,
  meta?: { model?: string; operation?: string },
): Promise<{ result: T; timing: DbTiming }> {
  const timer = createDbTimer(query, meta?.model, meta?.operation);
  const result = await fn();
  return { result, timing: timer.stop() };
}
