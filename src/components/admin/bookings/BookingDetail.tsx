"use client";

interface BookingDetailProps {
  booking: { name: string; email: string; phone?: string; date: string; time: string; guests: number; status: string; notes?: string; user?: { name: string | null; email: string } };
}

export function BookingDetail({ booking }: BookingDetailProps) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><p className="text-xs text-gray-500">Name</p><p className="font-medium">{booking.name}</p></div>
        <div><p className="text-xs text-gray-500">Email</p><p className="font-medium">{booking.email}</p></div>
        <div><p className="text-xs text-gray-500">Date</p><p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p></div>
        <div><p className="text-xs text-gray-500">Time</p><p className="font-medium">{booking.time}</p></div>
        <div><p className="text-xs text-gray-500">Guests</p><p className="font-medium">{booking.guests}</p></div>
        <div><p className="text-xs text-gray-500">Status</p><p className="font-medium">{booking.status}</p></div>
      </div>
      {booking.notes && <div><p className="text-xs text-gray-500">Notes</p><p className="text-sm">{booking.notes}</p></div>}
    </div>
  );
}
