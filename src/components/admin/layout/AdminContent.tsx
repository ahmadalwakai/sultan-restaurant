import { type ReactNode } from "react";
import { adminSpacing } from "@/lib/admin-ui";

/** Standard scrollable content wrapper inside the admin shell */
export function AdminContent({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: `${adminSpacing.page.y} ${adminSpacing.page.x}` }}>
      {children}
    </div>
  );
}
