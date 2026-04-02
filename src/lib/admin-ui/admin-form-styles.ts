import { brandColors, brandRadii } from "@/theme/branding";

/** Form field styling tokens for admin forms */
export const adminFormStyles = {
  label: {
    display: "block",
    marginBottom: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#374151",
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    borderRadius: brandRadii.lg,
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  } as React.CSSProperties,

  inputFocus: {
    borderColor: brandColors.gold[400],
    boxShadow: `0 0 0 3px ${brandColors.gold[100]}`,
  } as React.CSSProperties,

  textarea: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    borderRadius: brandRadii.lg,
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#111827",
    outline: "none",
    resize: "vertical" as const,
    minHeight: "5rem",
    transition: "border-color 0.15s, box-shadow 0.15s",
  } as React.CSSProperties,

  select: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    borderRadius: brandRadii.lg,
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  } as React.CSSProperties,

  error: {
    marginTop: "0.25rem",
    fontSize: "0.75rem",
    color: brandColors.accent[500],
  } as React.CSSProperties,

  hint: {
    marginTop: "0.25rem",
    fontSize: "0.75rem",
    color: "#9CA3AF",
  } as React.CSSProperties,
} as const;
