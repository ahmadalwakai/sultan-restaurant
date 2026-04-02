// ─── Monitoring Types ────────────────────────────────────

export type ServiceName = "database" | "stripe" | "resend" | "storage" | "google-maps";

export type HealthStatus = "healthy" | "degraded" | "unhealthy";

export interface ServiceHealth {
  service: ServiceName;
  status: HealthStatus;
  latencyMs: number;
  message?: string;
  checkedAt: string;
}

export interface HealthReport {
  status: HealthStatus;
  version: string;
  uptime: number;
  timestamp: string;
  services: ServiceHealth[];
}

export interface LogEntry {
  id: string;
  level: "debug" | "info" | "warn" | "error";
  message: string;
  context?: Record<string, unknown>;
  requestId?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  durationMs?: number;
  timestamp: string;
}

export interface AlertEvent {
  id: string;
  level: "info" | "warning" | "critical";
  type: string;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
  sentVia: ("email" | "webhook")[];
  createdAt: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: "ms" | "bytes" | "percent" | "count";
  tags?: Record<string, string>;
  timestamp: string;
}

export interface SystemInfo {
  nodeVersion: string;
  platform: string;
  memoryUsage: {
    heapUsed: number;
    heapTotal: number;
    rss: number;
  };
  uptime: number;
}
