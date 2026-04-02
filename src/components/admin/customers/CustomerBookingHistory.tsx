"use client";

import Link from "next/link";

interface Booking { id: string; date: string; time: string; guests: number; status: string }

export function CustomerBookingHistory({ bookings }: { bookings: Booking[] }) {
  if (!bookings.length) return <p className="text-sm text-gray-400">No bookings yet.</p>;

  return (
    <div className="space-y-2">
      {bookings.map((b) => (
        <Link key={b.id} href={`/admin/bookings/${b.id}`} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
          <div>
            <span className="font-medium text-sm">{new Date(b.date).toLocaleDateString()}</span>
            <span className="text-xs text-gray-400 ml-2">{b.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{b.guests} guests</span>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100">{b.status}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
