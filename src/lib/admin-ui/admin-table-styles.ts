import { brandColors, brandRadii } from "@/theme/branding";

/** Table styling tokens for admin data tables */
export const adminTableStyles = {
  wrapper: {
    background: "#FFFFFF",
    borderRadius: brandRadii.lg,
    border: "1px solid #E5E7EB",
    overflow: "hidden",
  } as React.CSSProperties,

  head: {
    background: "#F9FAFB",
  } as React.CSSProperties,

  headCell: {
    padding: "0.75rem 1rem",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "#6B7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    textAlign: "left" as const,
    borderBottom: "1px solid #E5E7EB",
  } as React.CSSProperties,

  cell: {
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "#111827",
    borderBottom: "1px solid #F3F4F6",
  } as React.CSSProperties,

  rowHover: {
    background: "#FAFAFA",
  } as const,

  /** Status badge presets */
  badge: {
    base: {
      display: "inline-block",
      padding: "0.125rem 0.5rem",
      borderRadius: brandRadii.full,
      fontSize: "0.75rem",
      fontWeight: 500,
    } as React.CSSProperties,
    success: { background: "#D1FAE5", color: "#065F46" },
    warning: { background: "#FEF3C7", color: "#92400E" },
    danger: { background: "#FEE2E2", color: "#991B1B" },
    info: { background: "#DBEAFE", color: "#1E40AF" },
    neutral: { background: "#F3F4F6", color: "#374151" },
    gold: { background: brandColors.gold[100], color: brandColors.gold[800] },
  },
} as const;
