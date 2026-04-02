// ─── Alert Webhook ───────────────────────────────────────

import { logger } from "../logging";
import type { AlertPayload } from "./alert-types";

const WEBHOOK_URL = process.env.ALERT_WEBHOOK_URL;

export async function sendAlertWebhook(payload: AlertPayload): Promise<boolean> {
  if (!WEBHOOK_URL) {
    logger.debug("Alert webhook URL not configured (ALERT_WEBHOOK_URL missing)");
    return false;
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        source: "sultan-restaurant",
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      logger.warn(`Alert webhook returned ${response.status}`, { rule: payload.rule });
      return false;
    }

    logger.info(`Alert webhook sent: ${payload.title}`, { alertWebhook: true, rule: payload.rule });
    return true;
  } catch (error) {
    logger.error("Failed to send alert webhook", {
      webhookError: error instanceof Error ? error.message : String(error),
      rule: payload.rule,
    });
    return false;
  }
}
