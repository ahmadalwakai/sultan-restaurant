// ─── Downtime Detector ───────────────────────────────────

import { logger } from "../logging";
import { pingEndpoint, type PingResult } from "./uptime-ping";

const serviceStatus = new Map<string, { consecutiveFailures: number; lastDown?: string }>();

const FAILURE_THRESHOLD = 3;

export function recordPingResult(result: PingResult): {
  isDown: boolean;
  consecutiveFailures: number;
} {
  const key = result.url;
  const status = serviceStatus.get(key) ?? { consecutiveFailures: 0 };

  if (!result.ok) {
    status.consecutiveFailures += 1;
    if (status.consecutiveFailures >= FAILURE_THRESHOLD && !status.lastDown) {
      status.lastDown = result.timestamp;
      logger.error(`Service DOWN: ${key} (${status.consecutiveFailures} consecutive failures)`, {
        downtime: true,
        url: key,
        failures: status.consecutiveFailures,
      });
    }
  } else {
    if (status.lastDown) {
      logger.info(`Service RECOVERED: ${key}`, {
        downtime: true,
        url: key,
        downSince: status.lastDown,
      });
    }
    status.consecutiveFailures = 0;
    status.lastDown = undefined;
  }

  serviceStatus.set(key, status);
  return {
    isDown: status.consecutiveFailures >= FAILURE_THRESHOLD,
    consecutiveFailures: status.consecutiveFailures,
  };
}

export async function checkAndRecordUptime(url: string): Promise<PingResult & { isDown: boolean }> {
  const result = await pingEndpoint(url);
  const { isDown } = recordPingResult(result);
  return { ...result, isDown };
}
