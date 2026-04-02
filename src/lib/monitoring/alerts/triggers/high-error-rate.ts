// ─── Trigger: High Error Rate ────────────────────────────

import { triggerAlert } from "../alert-manager";

export async function alertHighErrorRate(params: {
  errorCount: number;
  windowMinutes: number;
  threshold: number;
}) {
  return triggerAlert({
    rule: "high-error-rate",
    level: "warning",
    title: "High Error Rate Detected",
    message: `${params.errorCount} errors in the last ${params.windowMinutes} minutes (threshold: ${params.threshold})`,
    metadata: {
      errorCount: params.errorCount,
      windowMinutes: params.windowMinutes,
      threshold: params.threshold,
    },
  });
}
