"use client";

import type { OrderStatusType } from "@/types/order";

interface OrderStatusCardProps {
  status: OrderStatusType;
  orderNumber: string;
  updatedAt?: string;
}

const statusConfig: Record<OrderStatusType, { label: string; color: string; icon: string }> = {
  PENDING: { label: "Pending", color: "bg-yellow-50 border-yellow-200 text-yellow-700", icon: "⏳" },
  CONFIRMED: { label: "Confirmed", color: "bg-blue-50 border-blue-200 text-blue-700", icon: "✅" },
  PREPARING: { label: "Preparing", color: "bg-orange-50 border-orange-200 text-orange-700", icon: "👨‍🍳" },
  READY: { label: "Ready", color: "bg-green-50 border-green-200 text-green-700", icon: "🔔" },
  COMPLETED: { label: "Completed", color: "bg-gray-50 border-gray-200 text-gray-700", icon: "✅" },
  CANCELLED: { label: "Cancelled", color: "bg-red-50 border-red-200 text-red-700", icon: "❌" },
  REFUNDED: { label: "Refunded", color: "bg-purple-50 border-purple-200 text-purple-700", icon: "💰" },
};

export function OrderStatusCard({ status, orderNumber, updatedAt }: OrderStatusCardProps) {
  const config = statusConfig[status];

  return (
    <div className={`rounded-xl border p-4 ${config.color}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <p className="text-sm font-medium opacity-80">Order #{orderNumber}</p>
          <p className="text-lg font-bold">{config.label}</p>
          {updatedAt && <p className="text-xs opacity-60">{new Date(updatedAt).toLocaleString("en-GB")}</p>}
        </div>
      </div>
    </div>
  );
}
