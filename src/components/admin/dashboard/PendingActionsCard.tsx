"use client";

import Link from "next/link";

interface PendingAction {
  label: string;
  count: number;
  href: string;
  urgency: "high" | "medium" | "low";
}

interface PendingActionsCardProps {
  actions: PendingAction[];
}

const urgencyColors = {
  high: "text-red-600 bg-red-50",
  medium: "text-amber-600 bg-amber-50",
  low: "text-blue-600 bg-blue-50",
};

export function PendingActionsCard({ actions }: PendingActionsCardProps) {
  const totalPending = actions.reduce((sum, a) => sum + a.count, 0);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Pending Actions</h3>
        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-bold text-red-600">{totalPending}</span>
      </div>
      <div className="mt-4 space-y-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center justify-between rounded-lg border border-gray-50 p-3 transition-colors hover:bg-gray-50"
          >
            <span className="text-sm text-gray-700">{action.label}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${urgencyColors[action.urgency]}`}>
              {action.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
