"use client";

interface CouponUsageStatsProps {
  usedCount: number;
  maxUses?: number | null;
  totalRevenue?: number;
}

export function CouponUsageStats({ usedCount, maxUses, totalRevenue }: CouponUsageStatsProps) {
  const usagePercent = maxUses ? Math.round((usedCount / maxUses) * 100) : null;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white border rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-amber-600">{usedCount}</p>
        <p className="text-xs text-gray-500">Times Used</p>
      </div>
      <div className="bg-white border rounded-lg p-4 text-center">
        <p className="text-2xl font-bold">{maxUses ?? "\u221e"}</p>
        <p className="text-xs text-gray-500">Max Uses</p>
      </div>
      <div className="bg-white border rounded-lg p-4 text-center">
        {usagePercent !== null ? (
          <>
            <p className="text-2xl font-bold">{usagePercent}%</p>
            <p className="text-xs text-gray-500">Usage Rate</p>
          </>
        ) : totalRevenue !== undefined ? (
          <>
            <p className="text-2xl font-bold">£{(totalRevenue / 100).toFixed(0)}</p>
            <p className="text-xs text-gray-500">Revenue</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">-</p>
            <p className="text-xs text-gray-500">No Limit</p>
          </>
        )}
      </div>
    </div>
  );
}
