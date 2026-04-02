"use client";

import { brandColors, brandRadii } from "@/theme/branding";
import { adminLayout } from "@/lib/admin-ui";

interface AdminFormActionsProps {
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
}

/** Save / Cancel button pair for form footers */
export function AdminFormActions({
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isSubmitting = false,
}: AdminFormActionsProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "1rem" }}>
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: "0.5rem 1.5rem",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: adminLayout.primaryBtn.color,
          background: adminLayout.primaryBtn.background,
          borderRadius: brandRadii.lg,
          border: "none",
          cursor: isSubmitting ? "wait" : "pointer",
          opacity: isSubmitting ? 0.6 : 1,
          transition: "background 0.15s",
        }}
        className="admin-form-submit"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "0.5rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            ...adminLayout.ghostBtn,
            borderRadius: brandRadii.lg,
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          className="admin-form-cancel"
        >
          {cancelLabel}
        </button>
      )}

      <style>{`
        .admin-form-submit:hover:not(:disabled) { background: ${adminLayout.primaryBtn.hoverBg} !important; }
        .admin-form-cancel:hover { background: ${adminLayout.ghostBtn.hoverBg} !important; }
      `}</style>
    </div>
  );
}
