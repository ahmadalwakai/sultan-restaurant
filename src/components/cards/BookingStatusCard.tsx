"use client";

import type { BookingStatusType } from "@/types/booking";

interface BookingStatusCardProps {
  status: BookingStatusType;
  bookingDate: string;
  bookingTime: string;
}

const statusConfig: Record<BookingStatusType, { label: string; color: string; icon: string }> = {
  PENDING: { label: "Pending Confirmation", color: "bg-yellow-50 border-yellow-200 text-yellow-700", icon: "⏳" },
  CONFIRMED: { label: "Confirmed", color: "bg-green-50 border-green-200 text-green-700", icon: "✅" },
  CANCELLED: { label: "Cancelled", color: "bg-red-50 border-red-200 text-red-700", icon: "❌" },
  COMPLETED: { label: "Completed", color: "bg-gray-50 border-gray-200 text-gray-600", icon: "✅" },
  NO_SHOW: { label: "No Show", color: "bg-red-50 border-red-200 text-red-600", icon: "🚫" },
};

export function BookingStatusCard({ status, bookingDate, bookingTime }: BookingStatusCardProps) {
  const config = statusConfig[status];
  const dateObj = new Date(bookingDate);

  return (
    <div className={`rounded-xl border p-4 ${config.color}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <p className="text-lg font-bold">{config.label}</p>
          <p className="text-sm opacity-80">
            {dateObj.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} at {bookingTime}
          </p>
        </div>
      </div>
    </div>
  );
}
