"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Booking { id: string; name: string; date: string; time: string; guests: number; status: string }

export function BookingsTable({ bookings, isLoading }: { bookings: Booking[]; isLoading?: boolean }) {
  return (
    <AdminTable
      data={bookings}
      keyExtractor={(b) => b.id}
      isLoading={isLoading}
      columns={[
        { key: "name", header: "Name", render: (b) => <span className="font-medium">{b.name}</span> },
        { key: "date", header: "Date", render: (b) => new Date(b.date).toLocaleDateString() },
        { key: "time", header: "Time", render: (b) => b.time },
        { key: "guests", header: "Guests", render: (b) => b.guests },
        { key: "status", header: "Status", render: (b) => <span className={`text-xs px-2 py-1 rounded ${b.status === "CONFIRMED" ? "bg-green-100 text-green-700" : b.status === "CANCELLED" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{b.status}</span> },
        { key: "actions", header: "", className: "text-right", render: (b) => <Link href={`/admin/bookings/${b.id}`} className="text-sm text-amber-600 hover:underline">View</Link> },
      ]}
    />
  );
}
