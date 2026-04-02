// ─── Trigger: Order Spike ────────────────────────────────

import { triggerAlert } from "../alert-manager";

export async function alertOrderSpike(params: {
  currentCount: number;
  averageCount: number;
  windowMinutes: number;
}) {
  return triggerAlert({
    rule: "order-spike",
    level: "info",
    title: "Unusual Order Volume",
    message: `${params.currentCount} orders in last ${params.windowMinutes} minutes (average: ${params.averageCount})`,
    metadata: {
      currentCount: params.currentCount,
      averageCount: params.averageCount,
      windowMinutes: params.windowMinutes,
    },
  });
}
