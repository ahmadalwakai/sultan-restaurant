"use client";

import Link from "next/link";
import { brandColors, brandRadii, brandTypography } from "@/theme/branding";
import { adminLayout } from "@/lib/admin-ui";

interface AdminSectionTitleProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

/** Page-level heading with optional primary action button */
export function AdminSectionTitle({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: AdminSectionTitleProps) {
  const btnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: brandTypography.weights.medium,
    color: adminLayout.primaryBtn.color,
    background: adminLayout.primaryBtn.background,
    borderRadius: brandRadii.lg,
    border: "none",
    cursor: "pointer",
    transition: "background 0.15s",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
      <div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: brandTypography.weights.bold,
            color: brandColors.charcoal,
            fontFamily: brandTypography.fonts.body,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        {description && (
          <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#6B7280" }}>
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionHref && (
        <Link href={actionHref} style={btnStyle} className="admin-primary-btn">
          + {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <button onClick={onAction} style={btnStyle} className="admin-primary-btn">
          + {actionLabel}
        </button>
      )}

      <style>{`
        .admin-primary-btn:hover { background: ${adminLayout.primaryBtn.hoverBg} !important; }
      `}</style>
    </div>
  );
}
