"use client";

import { brandColors, brandRadii } from "@/theme/branding";
import { adminLayout } from "@/lib/admin-ui";

interface AdminEmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function AdminEmptyState({ icon = "📭", title, description, actionLabel, onAction }: AdminEmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{icon}</span>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: brandColors.charcoal, marginBottom: "0.25rem" }}>
        {title}
      </h3>
      {description && (
        <p style={{ fontSize: "0.875rem", color: "#9CA3AF", maxWidth: "20rem" }}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="admin-empty-action"
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: adminLayout.primaryBtn.background,
            color: adminLayout.primaryBtn.color,
            borderRadius: brandRadii.lg,
            border: "none",
            fontSize: "0.875rem",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          {actionLabel}
        </button>
      )}

      <style>{`
        .admin-empty-action:hover { background: ${adminLayout.primaryBtn.hoverBg} !important; }
      `}</style>
    </div>
  );
}
