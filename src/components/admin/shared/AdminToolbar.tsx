"use client";

import { type ReactNode } from "react";
import { adminSpacing } from "@/lib/admin-ui";

interface AdminToolbarProps {
  children: ReactNode;
}

/** Horizontal flex strip for search, filters, and export buttons above tables */
export function AdminToolbar({ children }: AdminToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: adminSpacing.md,
        marginBottom: adminSpacing.md,
      }}
    >
      {children}
    </div>
  );
}
