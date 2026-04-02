"use client";

import { forwardRef } from "react";
import { adminFormStyles } from "@/lib/admin-ui";
import { brandColors } from "@/theme/branding";

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Pass-through for react-hook-form or manual use */
}

export const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
  (props, ref) => (
    <>
      <input
        ref={ref}
        {...props}
        style={{ ...adminFormStyles.input, ...props.style }}
        className="admin-field-input"
      />
      <style>{`
        .admin-field-input:focus {
          border-color: ${brandColors.gold[400]} !important;
          box-shadow: 0 0 0 3px ${brandColors.gold[100]} !important;
        }
      `}</style>
    </>
  ),
);

AdminInput.displayName = "AdminInput";
