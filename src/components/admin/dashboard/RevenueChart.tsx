"use client";

interface DataPoint {
  createdAt: string;
  total: number;
}

export function RevenueChart({ data }: { data: DataPoint[] }) {
  if (!data.length) {
    return (
      <div className="bg-white border rounded-lg p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Revenue (30 days)</h3>
        <p className="text-sm text-gray-500 py-8 text-center">No revenue data yet</p>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => Number(d.total)));

  return (
    <div className="bg-white border rounded-lg p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Revenue (30 days)</h3>
      <div className="flex items-end gap-1 h-40">
        {data.map((d, i) => {
          const height = max > 0 ? (Number(d.total) / max) * 100 : 0;
          return (
            <div
              key={i}
              className="flex-1 bg-amber-500 rounded-t hover:bg-amber-600 transition-colors"
              style={{ height: `${Math.max(height, 2)}%` }}
              title={`£${(Number(d.total) / 100).toFixed(2)} - ${new Date(d.createdAt).toLocaleDateString()}`}
            />
          );
        })}
      </div>
    </div>
  );
}
