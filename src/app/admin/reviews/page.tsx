"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminStatusFilter } from "@/components/admin/shared/AdminStatusFilter";
import { AdminFilterBar } from "@/components/admin/shared/AdminFilterBar";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";

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
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Reviews" />
            <AdminFilterBar>
              <AdminStatusFilter value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={REVIEW_STATUSES} />
            </AdminFilterBar>
            {loading ? (
              <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />)}</div>
            ) : (
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-white border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{r.user?.name ?? "Anonymous"}</span>
                          <span className="text-amber-500">{"\u2605".repeat(r.rating)}{"\u2606".repeat(5 - r.rating)}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${r.status === "APPROVED" ? "bg-green-100 text-green-700" : r.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {r.status !== "APPROVED" && <button onClick={() => approve(r.id)} className="text-xs text-green-600 hover:underline">Approve</button>}
                        {r.status !== "REJECTED" && <button onClick={() => reject(r.id)} className="text-xs text-orange-600 hover:underline">Reject</button>}
                        <button onClick={() => deleteReview(r.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
