"use client";

import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Review { id: string; userName: string; rating: number; comment: string; status: string; createdAt: string }

export function ReviewsTable({ reviews, isLoading, onApprove, onReject, onDelete }: { reviews: Review[]; isLoading?: boolean; onApprove: (id: string) => void; onReject: (id: string) => void; onDelete: (id: string) => void }) {
  return (
    <AdminTable
      data={reviews}
      keyExtractor={(r) => r.id}
      isLoading={isLoading}
      columns={[
        { key: "user", header: "User", render: (r) => r.userName },
        { key: "rating", header: "Rating", render: (r) => <span className="text-amber-500">{"\u2605".repeat(r.rating)}{"\u2606".repeat(5 - r.rating)}</span> },
        { key: "comment", header: "Comment", render: (r) => <span className="text-sm text-gray-600 truncate max-w-xs inline-block">{r.comment}</span> },
        { key: "status", header: "Status", render: (r) => {
          const colors: Record<string, string> = { APPROVED: "bg-green-100 text-green-700", PENDING: "bg-yellow-100 text-yellow-700", REJECTED: "bg-red-100 text-red-700" };
          return <span className={`text-xs px-2 py-1 rounded font-medium ${colors[r.status] ?? "bg-gray-100"}`}>{r.status}</span>;
        }},
        { key: "actions", header: "", className: "text-right", render: (r) => (
          <div className="flex gap-2 justify-end">
            {r.status !== "APPROVED" && <button onClick={() => onApprove(r.id)} className="text-xs text-green-600 hover:underline">Approve</button>}
            {r.status !== "REJECTED" && <button onClick={() => onReject(r.id)} className="text-xs text-yellow-600 hover:underline">Reject</button>}
            <button onClick={() => onDelete(r.id)} className="text-xs text-red-600 hover:underline">Delete</button>
          </div>
        )},
      ]}
    />
  );
}
