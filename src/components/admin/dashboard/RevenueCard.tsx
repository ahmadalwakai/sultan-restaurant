"use client";

import { formatCurrency } from "@/lib/utils/format-currency";

interface RevenueCardProps {
  title: string;
  amount: number;
  previousAmount?: number;
  period: string;
}

export function RevenueCard({ title, amount, previousAmount, period }: RevenueCardProps) {
  const change = previousAmount ? ((amount - previousAmount) / previousAmount) * 100 : null;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(amount)}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">{period}</span>
        {change !== null && (
          <span className={`text-sm font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
            {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}
