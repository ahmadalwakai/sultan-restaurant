// ─── Uptime Ping ────────────────────────────────────────

import { logger } from "../logging";

export interface PingResult {
  url: string;
  ok: boolean;
  statusCode?: number;
  latencyMs: number;
  timestamp: string;
}

export async function pingEndpoint(url: string, timeoutMs = 10000): Promise<PingResult> {
  const start = performance.now();
  try {
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(timeoutMs),
    });
    const latencyMs = Math.round(performance.now() - start);
    return {
      url,
      ok: response.ok,
      statusCode: response.status,
      latencyMs,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const latencyMs = Math.round(performance.now() - start);
    logger.warn(`Ping failed: ${url}`, { error: error instanceof Error ? error.message : String(error) });
    return {
      url,
      ok: false,
      latencyMs,
      timestamp: new Date().toISOString(),
    };
  }
}
