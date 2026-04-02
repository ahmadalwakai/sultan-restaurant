"use client";

import Link from "next/link";

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  user?: { name: string | null };
}

export function RecentBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="bg-white border rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Recent Bookings</h3>
        <Link href="/admin/bookings" className="text-sm text-amber-600 hover:underline">View all</Link>
      </div>
      <div className="space-y-3">
        {bookings.map((b) => (
          <Link key={b.id} href={`/admin/bookings/${b.id}`} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">{b.user?.name ?? "Guest"}</p>
              <p className="text-xs text-gray-500">{new Date(b.date).toLocaleDateString()} at {b.time}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">{b.guests} guests</p>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100">{b.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
