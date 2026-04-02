// ─── Status Page Data ────────────────────────────────────

import { runFullHealthCheck } from "../health";
import { getSystemInfo } from "../performance";
import type { HealthReport } from "../health/health-types";
import type { SystemInfo } from "@/types/monitoring";

export interface StatusPageData {
  health: HealthReport;
  system: SystemInfo;
  generatedAt: string;
}

export async function getStatusPageData(): Promise<StatusPageData> {
  const [health, system] = await Promise.all([
    runFullHealthCheck(),
    Promise.resolve(getSystemInfo()),
  ]);

  return {
    health,
    system,
    generatedAt: new Date().toISOString(),
  };
}
