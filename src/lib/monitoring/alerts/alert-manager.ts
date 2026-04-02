// ─── Alert Manager ───────────────────────────────────────

import { logger } from "../logging";
import { getAlertRule } from "./alert-rules";
import { shouldThrottle, markSent } from "./alert-throttle";
import { sendAlertEmail } from "./alert-email";
import { sendAlertWebhook } from "./alert-webhook";
import type { Alert, AlertPayload, AlertChannel } from "./alert-types";

const alertHistory: Alert[] = [];
const MAX_HISTORY = 100;

export async function triggerAlert(payload: AlertPayload): Promise<Alert | null> {
  const rule = getAlertRule(payload.rule);

  if (!rule || !rule.enabled) {
    logger.debug(`Alert rule ${payload.rule} is disabled or not found`);
    return null;
  }

  if (shouldThrottle(rule.id, rule.cooldownMinutes)) {
    logger.debug(`Alert ${rule.id} throttled (cooldown: ${rule.cooldownMinutes}min)`);
    return null;
  }

  const sentVia: AlertChannel[] = [];

  const sends = rule.channels.map(async (channel) => {
    if (channel === "email") {
      const ok = await sendAlertEmail(payload);
      if (ok) sentVia.push("email");
    } else if (channel === "webhook") {
      const ok = await sendAlertWebhook(payload);
      if (ok) sentVia.push("webhook");
    }
  });

  await Promise.allSettled(sends);

  markSent(rule.id);

  const alert: Alert = {
    id: crypto.randomUUID(),
    rule: payload.rule,
    level: payload.level,
    title: payload.title,
    message: payload.message,
    metadata: payload.metadata,
    sentVia,
    createdAt: new Date().toISOString(),
  };

  alertHistory.unshift(alert);
  if (alertHistory.length > MAX_HISTORY) alertHistory.pop();

  logger.info(`Alert triggered: ${alert.title} [${alert.level}]`, {
    alert: true,
    rule: alert.rule,
    sentVia: alert.sentVia,
  });

  return alert;
}

export function getRecentAlerts(limit = 20): Alert[] {
  return alertHistory.slice(0, limit);
}
