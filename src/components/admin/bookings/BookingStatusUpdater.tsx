"use client";

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

interface BookingStatusUpdaterProps {
  bookingId: string;
  currentStatus: string;
  onUpdate: (id: string, status: string) => void;
}

export function BookingStatusUpdater({ bookingId, currentStatus, onUpdate }: BookingStatusUpdaterProps) {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onUpdate(bookingId, e.target.value)}
      className="text-sm px-2 py-1 border rounded-lg"
    >
      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
