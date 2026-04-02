"use client";

// ─── Uptime Indicator ────────────────────────────────────

interface UptimeIndicatorProps {
  uptime: number; // seconds
  status: "healthy" | "degraded" | "unhealthy";
}

export function UptimeIndicator({ uptime, status }: UptimeIndicatorProps) {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  const statusColors: Record<string, string> = {
    healthy: "text-green-600",
    degraded: "text-yellow-600",
    unhealthy: "text-red-600",
  };

  return (
    <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-3">
      <div className={`w-3 h-3 rounded-full ${status === "healthy" ? "bg-green-500" : status === "degraded" ? "bg-yellow-500" : "bg-red-500"}`} />
      <div>
        <p className={`text-sm font-semibold ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
        <p className="text-xs text-gray-500">
          Uptime: {days > 0 ? `${days}d ` : ""}{hours}h {minutes}m
        </p>
      </div>
    </div>
  );
}
