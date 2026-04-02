"use client";

interface CustomerStatsCardProps {
  totalCustomers: number;
  newToday: number;
  returningRate: number;
}

export function CustomerStatsCard({ totalCustomers, newToday, returningRate }: CustomerStatsCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-sm text-gray-500">Customers</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">{totalCustomers.toLocaleString()}</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400">New Today</p>
          <p className="text-lg font-semibold text-green-600">+{newToday}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Returning</p>
          <p className="text-lg font-semibold text-amber-600">{returningRate}%</p>
        </div>
      </div>
    </div>
  );
}
