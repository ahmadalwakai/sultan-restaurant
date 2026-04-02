// ─── Trigger: Slow Response ──────────────────────────────

import { triggerAlert } from "../alert-manager";

export async function alertSlowResponse(params: {
  path: string;
  method: string;
  durationMs: number;
  thresholdMs: number;
}) {
  return triggerAlert({
    rule: "slow-response",
    level: "warning",
    title: "Slow API Response",
    message: `${params.method} ${params.path} took ${params.durationMs}ms (threshold: ${params.thresholdMs}ms)`,
    metadata: {
      path: params.path,
      method: params.method,
      durationMs: params.durationMs,
      thresholdMs: params.thresholdMs,
    },
  });
}
