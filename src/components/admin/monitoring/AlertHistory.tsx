"use client";

// ─── Alert History ───────────────────────────────────────

import type { Alert } from "@/lib/monitoring/alerts/alert-types";

interface AlertHistoryProps {
  alerts: Alert[];
  isLoading?: boolean;
}

const levelColors: Record<string, string> = {
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
  critical: "bg-red-100 text-red-800",
};

export function AlertHistory({ alerts, isLoading }: AlertHistoryProps) {
  if (isLoading) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="h-5 w-32 bg-gray-100 rounded animate-pulse mb-4" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-14 bg-gray-50 rounded animate-pulse mb-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert History</h3>
      {alerts.length === 0 ? (
        <p className="text-sm text-gray-500">No alerts triggered</p>
      ) : (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${levelColors[alert.level] ?? "bg-gray-100"}`}>
                {alert.level}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                <p className="text-xs text-gray-500 truncate">{alert.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Sent via {alert.sentVia.join(", ") || "none"} &middot; {new Date(alert.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
