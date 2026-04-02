// ─── Alerts Core Index ───────────────────────────────────

export { triggerAlert, getRecentAlerts } from "./alert-manager";
export { sendAlertEmail } from "./alert-email";
export { sendAlertWebhook } from "./alert-webhook";
export { getAlertRule, ALERT_RULES } from "./alert-rules";
export { shouldThrottle, markSent, resetThrottle } from "./alert-throttle";
export type { Alert, AlertPayload, AlertLevel, AlertChannel, AlertRule } from "./alert-types";
