"use client";

// ─── Request Volume Chart ────────────────────────────────

interface RequestVolumeChartProps {
  stats: {
    count: number;
    avgDurationMs: number;
    windowHours: number;
  } | null;
  isLoading?: boolean;
}

export function RequestVolumeChart({ stats, isLoading }: RequestVolumeChartProps) {
  if (isLoading || !stats) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="h-5 w-36 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="h-20 bg-gray-50 rounded animate-pulse" />
      </div>
    );
  }

  const reqPerHour = stats.count > 0 ? Math.round(stats.count / stats.windowHours) : 0;

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Request Volume</h3>
      <p className="text-sm text-gray-500 mb-4">Last {stats.windowHours} hours</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-3xl font-bold text-gray-900">{stats.count.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total requests</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">{reqPerHour}</p>
          <p className="text-sm text-gray-500">Per hour</p>
        </div>
      </div>
    </div>
  );
}
