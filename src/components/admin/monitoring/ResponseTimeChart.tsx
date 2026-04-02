"use client";

// ─── Response Time Chart (Simple Bar) ────────────────────

interface ResponseTimeChartProps {
  stats: {
    count: number;
    avgDurationMs: number;
    maxDurationMs: number;
    minDurationMs: number;
    slowRequests: number;
    windowHours: number;
  } | null;
  isLoading?: boolean;
}

export function ResponseTimeChart({ stats, isLoading }: ResponseTimeChartProps) {
  if (isLoading || !stats) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="h-5 w-36 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="h-32 bg-gray-50 rounded animate-pulse" />
      </div>
    );
  }

  const items = [
    { label: "Avg", value: stats.avgDurationMs, color: "bg-blue-400" },
    { label: "Max", value: stats.maxDurationMs, color: "bg-red-400" },
    { label: "Min", value: stats.minDurationMs, color: "bg-green-400" },
  ];

  const maxVal = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Response Times</h3>
      <p className="text-sm text-gray-500 mb-4">
        {stats.count} requests &middot; {stats.slowRequests} slow (&gt;3s) &middot; last {stats.windowHours}h
      </p>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs font-medium w-10 text-gray-600">{item.label}</span>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.value / maxVal) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 w-16 text-right">{item.value}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}
