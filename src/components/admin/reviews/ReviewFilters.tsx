"use client";

import { AdminFilterBar } from "@/components/admin/shared/AdminFilterBar";
import { AdminStatusFilter } from "@/components/admin/shared/AdminStatusFilter";

const REVIEW_STATUSES = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

export function ReviewFilters({ status, onStatusChange }: { status: string; onStatusChange: (s: string) => void }) {
  return (
    <AdminFilterBar>
      <AdminStatusFilter value={status} onChange={onStatusChange} options={REVIEW_STATUSES} />
    </AdminFilterBar>
  );
}
