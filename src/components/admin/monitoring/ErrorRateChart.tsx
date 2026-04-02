"use client";

// ─── Error Rate Chart (Simple Bar) ──────────────────────

interface ErrorRateChartProps {
  stats: {
    total: number;
    bySeverity: Record<string, number>;
    windowHours: number;
  } | null;
  isLoading?: boolean;
}

const severityColors: Record<string, string> = {
  low: "bg-blue-400",
  medium: "bg-yellow-400",
  high: "bg-orange-400",
  critical: "bg-red-500",
};

export function ErrorRateChart({ stats, isLoading }: ErrorRateChartProps) {
  if (isLoading || !stats) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="h-5 w-36 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="h-32 bg-gray-50 rounded animate-pulse" />
      </div>
    );
  }

  const maxCount = Math.max(...Object.values(stats.bySeverity), 1);

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Error Rate</h3>
      <p className="text-sm text-gray-500 mb-4">
        {stats.total} errors in last {stats.windowHours}h
      </p>
      <div className="space-y-3">
        {Object.entries(stats.bySeverity).map(([severity, count]) => (
          <div key={severity} className="flex items-center gap-3">
            <span className="text-xs font-medium w-16 text-gray-600 capitalize">{severity}</span>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${severityColors[severity] ?? "bg-gray-400"}`}
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 w-8 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
