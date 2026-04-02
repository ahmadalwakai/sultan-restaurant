"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminLoadingState } from "@/components/admin/shared";
import { adminSpacing } from "@/lib/admin-ui";

export default function AdminBookingDetailPage() {
  const params = useParams();
  const [booking, setBooking] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/bookings/${params.id}`).then((r) => r.json()).then((d) => setBooking(d.data));
  }, [params.id]);

  if (!booking) return <AdminShell><AdminPageShell><AdminLoadingState rows={4} height="2.5rem" /></AdminPageShell></AdminShell>;

  const fieldStyle = { fontSize: "0.75rem", color: "#6B7280", marginBottom: "0.125rem" } as const;
  const valueStyle = { fontWeight: 500 as const, fontSize: "0.875rem" };

  return (
    <AdminShell>
      <AdminPageShell>
        <Link href="/admin/bookings" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>&larr; Back to Bookings</Link>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginTop: "0.5rem", marginBottom: adminSpacing.stack }}>Booking Details</h1>
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, maxWidth: "42rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div><p style={fieldStyle}>Name</p><p style={valueStyle}>{booking.name as string}</p></div>
            <div><p style={fieldStyle}>Email</p><p style={valueStyle}>{booking.email as string}</p></div>
            <div><p style={fieldStyle}>Date</p><p style={valueStyle}>{new Date(booking.date as string).toLocaleDateString()}</p></div>
            <div><p style={fieldStyle}>Time</p><p style={valueStyle}>{booking.time as string}</p></div>
            <div><p style={fieldStyle}>Guests</p><p style={valueStyle}>{booking.guests as number}</p></div>
            <div><p style={fieldStyle}>Status</p><p style={valueStyle}>{booking.status as string}</p></div>
          </div>
          {Boolean(booking.notes) && (
            <div><p style={fieldStyle}>Notes</p><p style={{ fontSize: "0.875rem" }}>{String(booking.notes)}</p></div>
          )}
        </div>
      </AdminPageShell>
    </AdminShell>
  );
}
