// ─── Alert Rules ─────────────────────────────────────────

import type { AlertRule } from "./alert-types";

export const ALERT_RULES: AlertRule[] = [
  {
    id: "payment-failed",
    name: "Payment Failed",
    level: "critical",
    channels: ["email", "webhook"],
    enabled: true,
    cooldownMinutes: 5,
  },
  {
    id: "db-connection-lost",
    name: "Database Connection Lost",
    level: "critical",
    channels: ["email", "webhook"],
    enabled: true,
    cooldownMinutes: 2,
  },
  {
    id: "high-error-rate",
    name: "High Error Rate",
    level: "warning",
    channels: ["email"],
    enabled: true,
    cooldownMinutes: 15,
  },
  {
    id: "slow-response",
    name: "Slow API Response",
    level: "warning",
    channels: ["webhook"],
    enabled: true,
    cooldownMinutes: 10,
  },
  {
    id: "storage-full",
    name: "Storage Approaching Limit",
    level: "warning",
    channels: ["email"],
    enabled: true,
    cooldownMinutes: 60,
  },
  {
    id: "auth-brute-force",
    name: "Brute Force Login Attempt",
    level: "critical",
    channels: ["email", "webhook"],
    enabled: true,
    cooldownMinutes: 5,
  },
  {
    id: "order-spike",
    name: "Unusual Order Volume",
    level: "info",
    channels: ["email"],
    enabled: true,
    cooldownMinutes: 30,
  },
];

export function getAlertRule(ruleId: string): AlertRule | undefined {
  return ALERT_RULES.find((r) => r.id === ruleId);
}
