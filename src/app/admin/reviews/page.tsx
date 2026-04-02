"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableToolbar, AdminTableFilters, AdminTablePagination, AdminStatusBadge } from "@/components/admin/tables";
import { adminSpacing, adminLayout } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";
import { brandColors } from "@/theme/branding";

const REVIEW_STATUSES = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Array<{ id: string; rating: number; comment: string; status: string; user?: { name: string | null } }>>([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/reviews?${params}`);
    const data = await res.json();
    setReviews(data.data);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page, status]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  async function approve(id: string) { await fetch(`/api/admin/reviews/${id}/approve`, { method: "PATCH" }); fetchReviews(); }
  async function reject(id: string) { await fetch(`/api/admin/reviews/${id}/reject`, { method: "PATCH" }); fetchReviews(); }
  async function deleteReview(id: string) { if (!confirm("Delete?")) return; await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" }); fetchReviews(); }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.reviews.title} description={adminHeadings.reviews.description} />

        <AdminTableToolbar>
          <AdminTableFilters value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={REVIEW_STATUSES} label="Status" />
        </AdminTableToolbar>

        {loading ? (
          <AdminLoadingState rows={4} height="5rem" />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {reviews.map((r) => (
              <div key={r.id} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#111827" }}>{r.user?.name ?? "Anonymous"}</span>
                      <span style={{ color: brandColors.gold[500] }}>{"\u2605".repeat(r.rating)}{"\u2606".repeat(5 - r.rating)}</span>
                      <AdminStatusBadge status={r.status} />
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#4B5563", marginTop: "0.25rem" }}>{r.comment}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    {r.status !== "APPROVED" && <button onClick={() => approve(r.id)} style={{ fontSize: "0.75rem", color: "#059669", background: "none", border: "none", cursor: "pointer" }}>Approve</button>}
                    {r.status !== "REJECTED" && <button onClick={() => reject(r.id)} style={{ fontSize: "0.75rem", color: "#EA580C", background: "none", border: "none", cursor: "pointer" }}>Reject</button>}
                    <button onClick={() => deleteReview(r.id)} style={{ fontSize: "0.75rem", color: "#DC2626", background: "none", border: "none", cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <AdminTablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </AdminPageShell>
    </AdminShell>
  );
}
