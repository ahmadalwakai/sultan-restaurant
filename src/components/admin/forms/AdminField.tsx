import { type ReactNode } from "react";
import { adminFormStyles } from "@/lib/admin-ui";

interface AdminFieldProps {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/** Wraps any form control with label, error, and hint */
export function AdminField({ label, error, hint, children }: AdminFieldProps) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={adminFormStyles.label}>{label}</label>
      {children}
      {error && <p style={adminFormStyles.error}>{error}</p>}
      {hint && !error && <p style={adminFormStyles.hint}>{hint}</p>}
    </div>
  );
}
