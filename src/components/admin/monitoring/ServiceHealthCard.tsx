"use client";

// ─── Service Health Card ─────────────────────────────────

import type { ServiceHealth } from "@/lib/monitoring/health/health-types";

interface ServiceHealthCardProps {
  service: ServiceHealth;
}

const statusIcon: Record<string, string> = {
  healthy: "🟢",
  degraded: "🟡",
  unhealthy: "🔴",
};

export function ServiceHealthCard({ service }: ServiceHealthCardProps) {
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center gap-2">
        <span>{statusIcon[service.status] ?? "⚪"}</span>
        <span className="text-sm font-medium text-gray-900 capitalize">
          {service.service.replace("-", " ")}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-xs text-gray-500">{service.latencyMs}ms</span>
        {service.message && (
          <span className="text-xs text-gray-400 truncate ml-2">{service.message}</span>
        )}
      </div>
    </div>
  );
}
