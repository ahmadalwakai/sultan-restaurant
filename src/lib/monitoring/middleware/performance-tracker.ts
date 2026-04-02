// ─── Performance Tracker Middleware ───────────────────────

import { logResponse } from "../logging";

export function createResponseTimer(params: {
  method: string;
  path: string;
  requestId: string;
}) {
  const start = performance.now();
  return {
    finish(statusCode: number) {
      const durationMs = Math.round(performance.now() - start);
      logResponse({
        method: params.method,
        path: params.path,
        statusCode,
        durationMs,
        requestId: params.requestId,
      });
      return durationMs;
    },
  };
}
