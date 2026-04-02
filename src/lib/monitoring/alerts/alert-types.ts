// ─── Alert Types ─────────────────────────────────────────

export type AlertLevel = "info" | "warning" | "critical";
export type AlertChannel = "email" | "webhook";

export interface AlertRule {
  id: string;
  name: string;
  level: AlertLevel;
  channels: AlertChannel[];
  enabled: boolean;
  cooldownMinutes: number;
}

export interface Alert {
  id: string;
  rule: string;
  level: AlertLevel;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
  sentVia: AlertChannel[];
  createdAt: string;
}

export interface AlertPayload {
  rule: string;
  level: AlertLevel;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}
