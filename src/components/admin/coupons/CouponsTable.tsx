"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/shared/AdminTable";
import { CouponStatusBadge } from "./CouponStatusBadge";

interface Coupon { id: string; code: string; discountType: string; discountValue: number; isActive: boolean; maxUses?: number | null; usedCount: number; expiresAt?: string | null }

export function CouponsTable({ coupons, isLoading, onToggle, onDelete }: { coupons: Coupon[]; isLoading?: boolean; onToggle: (id: string, active: boolean) => void; onDelete: (id: string) => void }) {
  return (
    <AdminTable
      data={coupons}
      keyExtractor={(c) => c.id}
      isLoading={isLoading}
      columns={[
        { key: "code", header: "Code", render: (c) => <Link href={`/admin/coupons/${c.id}/edit`} className="font-mono font-medium text-amber-600 hover:underline">{c.code}</Link> },
        { key: "discount", header: "Discount", render: (c) => c.discountType === "PERCENTAGE" ? `${c.discountValue}%` : `£${(c.discountValue / 100).toFixed(2)}` },
        { key: "usage", header: "Used", render: (c) => `${c.usedCount}${c.maxUses ? ` / ${c.maxUses}` : ""}` },
        { key: "status", header: "Status", render: (c) => <CouponStatusBadge isActive={c.isActive} expiresAt={c.expiresAt} /> },
        { key: "actions", header: "", className: "text-right", render: (c) => (
          <div className="flex gap-2 justify-end">
            <button onClick={() => onToggle(c.id, !c.isActive)} className="text-xs text-blue-600 hover:underline">{c.isActive ? "Disable" : "Enable"}</button>
            <button onClick={() => onDelete(c.id)} className="text-xs text-red-600 hover:underline">Delete</button>
          </div>
        )},
      ]}
    />
  );
}
