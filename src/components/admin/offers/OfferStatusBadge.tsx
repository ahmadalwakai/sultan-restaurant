"use client";

export function OfferStatusBadge({ isActive, expiresAt }: { isActive: boolean; expiresAt?: string | null }) {
  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
  const label = isExpired ? "Expired" : isActive ? "Active" : "Inactive";
  const color = isExpired ? "bg-red-100 text-red-700" : isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";

  return <span className={`text-xs px-2 py-1 rounded font-medium ${color}`}>{label}</span>;
}
