"use client";

import { type ReactNode } from "react";
import { adminSpacing } from "@/lib/admin-ui";
import { adminLayout } from "@/lib/admin-ui";

interface AdminPageShellProps {
  children: ReactNode;
}

/** Standard page wrapper — provides padding + max-width inside the content area */
export function AdminPageShell({ children }: AdminPageShellProps) {
  return (
    <div
      style={{
        padding: `${adminSpacing.page.y} ${adminSpacing.page.x}`,
        background: adminLayout.content.bg,
        minHeight: "100%",
      }}
    >
      {children}
    </div>
  );
}
