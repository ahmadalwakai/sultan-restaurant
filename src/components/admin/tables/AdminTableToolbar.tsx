"use client";

import { type ReactNode } from "react";
import { adminSpacing } from "@/lib/admin-ui";

interface AdminTableToolbarProps {
  children: ReactNode;
}

/** Horizontal bar above a table for search / filter / export */
export function AdminTableToolbar({ children }: AdminTableToolbarProps) {
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
