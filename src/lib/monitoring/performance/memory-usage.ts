// ─── Memory Usage ────────────────────────────────────────

import type { SystemInfo } from "@/types/monitoring";

export function getMemoryUsage(): SystemInfo["memoryUsage"] {
  if (typeof process === "undefined") {
    return { heapUsed: 0, heapTotal: 0, rss: 0 };
  }
  const mem = process.memoryUsage();
  return {
    heapUsed: mem.heapUsed,
    heapTotal: mem.heapTotal,
    rss: mem.rss,
  };
}

export function getSystemInfo(): SystemInfo {
  return {
    nodeVersion: typeof process !== "undefined" ? process.version : "unknown",
    platform: typeof process !== "undefined" ? process.platform : "unknown",
    memoryUsage: getMemoryUsage(),
    uptime: typeof process !== "undefined" ? Math.floor(process.uptime()) : 0,
  };
}
