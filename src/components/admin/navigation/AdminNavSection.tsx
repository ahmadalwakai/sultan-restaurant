import { type ReactNode } from "react";

interface AdminNavSectionProps {
  title?: string;
  children: ReactNode;
}

/** Sidebar section grouping with optional label */
export function AdminNavSection({ title, children }: AdminNavSectionProps) {
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      {title && (
        <p
          style={{
            padding: "0.25rem 1rem",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "#6B7280",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {title}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
        {children}
      </div>
    </div>
  );
}
