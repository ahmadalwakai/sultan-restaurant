"use client";

// ─── System Info Card ────────────────────────────────────

import type { SystemInfo } from "@/types/monitoring";

interface SystemInfoCardProps {
  system: SystemInfo | null;
  isLoading?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function SystemInfoCard({ system, isLoading }: SystemInfoCardProps) {
  if (isLoading || !system) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="h-5 w-28 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-50 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const items = [
    { label: "Node", value: system.nodeVersion },
    { label: "Platform", value: system.platform },
    { label: "Heap Used", value: formatBytes(system.memoryUsage.heapUsed) },
    { label: "Heap Total", value: formatBytes(system.memoryUsage.heapTotal) },
    { label: "RSS", value: formatBytes(system.memoryUsage.rss) },
    { label: "Process Uptime", value: `${Math.floor(system.uptime / 3600)}h ${Math.floor((system.uptime % 3600) / 60)}m` },
  ];

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Info</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{item.label}</span>
            <span className="font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
