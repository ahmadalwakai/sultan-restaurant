"use client";

// ─── Health Status Panel ─────────────────────────────────

import type { HealthReport } from "@/lib/monitoring/health/health-types";
import { ServiceHealthCard } from "./ServiceHealthCard";

interface HealthStatusPanelProps {
  health: HealthReport | null;
  isLoading?: boolean;
}

const statusColors: Record<string, string> = {
  healthy: "bg-green-100 text-green-800",
  degraded: "bg-yellow-100 text-yellow-800",
  unhealthy: "bg-red-100 text-red-800",
};

export function HealthStatusPanel({ health, isLoading }: HealthStatusPanelProps) {
  if (isLoading || !health) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="h-6 w-40 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[health.status] ?? "bg-gray-100"}`}>
          {health.status.toUpperCase()}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {health.services.map((service) => (
          <ServiceHealthCard key={service.service} service={service} />
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-400">
        Version {health.version} &middot; Uptime {Math.floor(health.uptime / 3600)}h {Math.floor((health.uptime % 3600) / 60)}m
      </p>
    </div>
  );
}
