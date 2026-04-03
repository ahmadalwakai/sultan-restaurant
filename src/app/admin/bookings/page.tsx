"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminTableToolbar, AdminTableFilters, AdminTablePagination, AdminStatusBadge } from "@/components/admin/tables";
import { VStack, NativeSelect } from "@chakra-ui/react";
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
        <VStack gap={0} align="stretch">
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
                  <tr style={{ background: "#F9FAFB" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Name</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Date</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Time</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Guests</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Status</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: 500 }}>{b.name}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>{new Date(b.date).toLocaleDateString()}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>{b.time}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>{b.guests}</td>
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <NativeSelect.Root size="xs" maxW="8rem">
                          <NativeSelect.Field
                            value={b.status}
                            onChange={(e) => updateStatus(b.id, e.target.value)}
                          >
                            {BOOKING_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                          </NativeSelect.Field>
                        </NativeSelect.Root>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                        <Link href={`/admin/bookings/${b.id}`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AdminTableShell>
          )}

          <AdminTablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
