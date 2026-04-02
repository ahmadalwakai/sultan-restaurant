"use client";

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  change?: string;
}

interface DashboardStatsProps {
  stats: StatCard[];
  isLoading?: boolean;
}

export function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white border rounded-lg p-5">
          <div className="flex items-center justify-between">
            <span className="text-2xl">{stat.icon}</span>
            {stat.change && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            )}
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
