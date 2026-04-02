"use client";

interface Booking { id: string; name: string; time: string; guests: number; status: string }

export function BookingCalendarView({ bookings, date }: { bookings: Booking[]; date: string }) {
  const slots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-semibold mb-3">{date ? new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) : "Today"}</h3>
      <div className="space-y-1">
        {slots.filter((_, i) => i >= 11 && i <= 22).map((slot) => {
          const slotBookings = bookings.filter((b) => b.time.startsWith(slot.split(":")[0]));
          return (
            <div key={slot} className="flex gap-3 text-sm">
              <span className="w-16 text-gray-400 shrink-0">{slot}</span>
              <div className="flex-1 flex gap-1">
                {slotBookings.map((b) => (
                  <span key={b.id} className="px-2 py-1 bg-amber-50 border border-amber-200 rounded text-xs">
                    {b.name} ({b.guests})
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
