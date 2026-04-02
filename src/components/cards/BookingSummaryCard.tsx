"use client";

import type { BookingPublic } from "@/types/booking";

interface BookingSummaryCardProps {
  booking: BookingPublic;
}

export function BookingSummaryCard({ booking }: BookingSummaryCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-gray-900">Booking Summary</h3>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Name</span>
          <span className="font-medium text-gray-900">{booking.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Date</span>
          <span className="font-medium text-gray-900">
            {new Date(booking.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Time</span>
          <span className="font-medium text-gray-900">{booking.time}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Guests</span>
          <span className="font-medium text-gray-900">{booking.guests} {booking.guests === 1 ? "person" : "people"}</span>
        </div>
        {booking.specialRequests && (
          <div className="border-t pt-3">
            <p className="text-sm text-gray-500">Special Requests</p>
            <p className="mt-1 text-sm text-gray-700">{booking.specialRequests}</p>
          </div>
        )}
      </div>
    </div>
  );
}
