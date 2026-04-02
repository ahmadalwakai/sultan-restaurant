"use client";

const STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED", "CANCELLED"];

interface OrderStatusUpdaterProps {
  orderId: string;
  currentStatus: string;
  onUpdate: (id: string, status: string) => void;
}

export function OrderStatusUpdater({ orderId, currentStatus, onUpdate }: OrderStatusUpdaterProps) {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onUpdate(orderId, e.target.value)}
      className="text-sm px-3 py-2 border rounded-lg"
    >
      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
