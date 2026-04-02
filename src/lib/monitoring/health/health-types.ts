import type { ServiceName, HealthStatus } from "@/types/monitoring";

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

export interface HealthCheckResult {
  ok: boolean;
  latencyMs: number;
  message?: string;
}
