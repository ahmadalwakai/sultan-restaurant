"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminTableToolbar, AdminTableFilters, AdminTablePagination, AdminStatusBadge } from "@/components/admin/tables";
import { adminTableStyles, adminFormStyles } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";

const BOOKING_STATUSES = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Completed", value: "COMPLETED" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Array<{ id: string; name: string; email: string; date: string; time: string; guests: number; status: string }>>([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/bookings?${params}`);
    const data = await res.json();
    setBookings(data.data);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page, status]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  async function updateStatus(id: string, newStatus: string) {
    await fetch(`/api/admin/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchBookings();
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.bookings.title} description={adminHeadings.bookings.description} />

        <AdminTableToolbar>
          <AdminTableFilters value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={BOOKING_STATUSES} label="Status" />
        </AdminTableToolbar>

        {loading ? (
          <AdminLoadingState rows={5} height="3.5rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>Name</th>
                  <th style={adminTableStyles.headCell}>Date</th>
                  <th style={adminTableStyles.headCell}>Time</th>
                  <th style={adminTableStyles.headCell}>Guests</th>
                  <th style={adminTableStyles.headCell}>Status</th>
                  <th style={{ ...adminTableStyles.headCell, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ ...adminTableStyles.cell, fontWeight: 500 }}>{b.name}</td>
                    <td style={adminTableStyles.cell}>{new Date(b.date).toLocaleDateString()}</td>
                    <td style={adminTableStyles.cell}>{b.time}</td>
                    <td style={adminTableStyles.cell}>{b.guests}</td>
                    <td style={adminTableStyles.cell}>
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        style={{ ...adminFormStyles.select, width: "auto", padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                      >
                        {BOOKING_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td style={{ ...adminTableStyles.cell, textAlign: "right" }}>
                      <Link href={`/admin/bookings/${b.id}`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        )}

        <AdminTablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </AdminPageShell>
    </AdminShell>
  );
}
