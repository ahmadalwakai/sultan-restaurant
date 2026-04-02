import { type ReactNode } from "react";
import { adminTableStyles } from "@/lib/admin-ui";

interface AdminTableShellProps {
  children: ReactNode;
}

/** Table container with white background, border, and rounded corners */
export function AdminTableShell({ children }: AdminTableShellProps) {
  return (
    <div style={adminTableStyles.wrapper}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        {children}
      </table>
    </div>
  );
}
