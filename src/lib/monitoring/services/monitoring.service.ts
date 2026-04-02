// ─── Monitoring Service ──────────────────────────────────

import { runFullHealthCheck } from "../health";
import { getSystemInfo } from "../performance";
import { getRecentAlerts } from "../alerts";
import { getErrorStats } from "../repositories/error-log.repository";
import { getPerformanceStats } from "../repositories/performance-log.repository";

export async function getMonitoringDashboardData() {
  const [health, system, errorStats, performanceStats, alerts] = await Promise.all([
    runFullHealthCheck(),
    Promise.resolve(getSystemInfo()),
    getErrorStats(24).catch(() => ({ total: 0, bySeverity: {}, windowHours: 24 })),
    getPerformanceStats(24).catch(() => ({
      count: 0,
      avgDurationMs: 0,
      maxDurationMs: 0,
      minDurationMs: 0,
      slowRequests: 0,
      windowHours: 24,
    })),
    Promise.resolve(getRecentAlerts(10)),
  ]);

  return {
    health,
    system,
    errorStats,
    performanceStats,
    recentAlerts: alerts,
    generatedAt: new Date().toISOString(),
  };
}
