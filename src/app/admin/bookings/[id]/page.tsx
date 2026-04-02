"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminBookingDetailPage() {
  const params = useParams();
  const [booking, setBooking] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/bookings/${params.id}`).then((r) => r.json()).then((d) => setBooking(d.data));
  }, [params.id]);

  if (!booking) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" /></div>;

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <Link href="/admin/bookings" className="text-sm text-gray-500 hover:underline">&larr; Back to Bookings</Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-6">Booking Details</h1>
            <div className="bg-white border rounded-lg p-6 max-w-2xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Name</p><p className="font-medium">{booking.name as string}</p></div>
                <div><p className="text-xs text-gray-500">Email</p><p className="font-medium">{booking.email as string}</p></div>
                <div><p className="text-xs text-gray-500">Date</p><p className="font-medium">{new Date(booking.date as string).toLocaleDateString()}</p></div>
                <div><p className="text-xs text-gray-500">Time</p><p className="font-medium">{booking.time as string}</p></div>
                <div><p className="text-xs text-gray-500">Guests</p><p className="font-medium">{booking.guests as number}</p></div>
                <div><p className="text-xs text-gray-500">Status</p><p className="font-medium">{booking.status as string}</p></div>
              </div>
              {Boolean(booking.notes) && (
                <div><p className="text-xs text-gray-500">Notes</p><p className="text-sm">{String(booking.notes)}</p></div>
              )}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
