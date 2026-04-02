"use client";

import { brandColors, brandRadii } from "@/theme/branding";
import { adminLayout } from "@/lib/admin-ui";

interface AdminTablePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AdminTablePagination({ page, totalPages, onPageChange }: AdminTablePaginationProps) {
  if (totalPages <= 1) return null;

  const btnBase: React.CSSProperties = {
    padding: "0.375rem 0.875rem",
    fontSize: "0.8125rem",
    borderRadius: brandRadii.lg,
    cursor: "pointer",
    transition: "background 0.15s",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "1rem",
        padding: "0.5rem 0",
      }}
    >
      <span style={{ fontSize: "0.8125rem", color: "#6B7280" }}>
        Page {page} of {totalPages}
      </span>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          style={{
            ...btnBase,
            ...adminLayout.ghostBtn,
            opacity: page <= 1 ? 0.5 : 1,
            cursor: page <= 1 ? "default" : "pointer",
          }}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          style={{
            ...btnBase,
            ...adminLayout.ghostBtn,
            opacity: page >= totalPages ? 0.5 : 1,
            cursor: page >= totalPages ? "default" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
