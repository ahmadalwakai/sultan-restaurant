"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/shared/AdminTable";
import { OfferStatusBadge } from "./OfferStatusBadge";

interface Offer { id: string; title: string; discountType: string; discountValue: number; isActive: boolean; expiresAt?: string | null }

interface OffersTableProps {
  offers: Offer[];
  isLoading?: boolean;
  onToggle: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export function OffersTable({ offers, isLoading, onToggle, onDelete }: OffersTableProps) {
  return (
    <AdminTable
      data={offers}
      keyExtractor={(o) => o.id}
      isLoading={isLoading}
      columns={[
        { key: "title", header: "Title", render: (o) => <Link href={`/admin/offers/${o.id}/edit`} className="text-amber-600 hover:underline font-medium">{o.title}</Link> },
        { key: "discount", header: "Discount", render: (o) => o.discountType === "PERCENTAGE" ? `${o.discountValue}%` : `£${(o.discountValue / 100).toFixed(2)}` },
        { key: "status", header: "Status", render: (o) => <OfferStatusBadge isActive={o.isActive} expiresAt={o.expiresAt} /> },
        { key: "actions", header: "", className: "text-right", render: (o) => (
          <div className="flex gap-2 justify-end">
            <button onClick={() => onToggle(o.id, !o.isActive)} className="text-xs text-blue-600 hover:underline">{o.isActive ? "Disable" : "Enable"}</button>
            <button onClick={() => onDelete(o.id)} className="text-xs text-red-600 hover:underline">Delete</button>
          </div>
        )},
      ]}
    />
  );
}
