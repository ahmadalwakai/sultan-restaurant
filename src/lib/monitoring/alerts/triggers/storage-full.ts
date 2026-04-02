// ─── Trigger: Storage Full ────────────────────────────────

import { triggerAlert } from "../alert-manager";

export async function alertStorageFull(params: {
  usedPercent: number;
  usedBytes: number;
  totalBytes: number;
}) {
  return triggerAlert({
    rule: "storage-full",
    level: "warning",
    title: "Storage Approaching Limit",
    message: `Storage usage at ${params.usedPercent.toFixed(1)}%`,
    metadata: {
      usedPercent: params.usedPercent,
      usedMB: (params.usedBytes / 1024 / 1024).toFixed(1),
      totalMB: (params.totalBytes / 1024 / 1024).toFixed(1),
    },
  });
}
