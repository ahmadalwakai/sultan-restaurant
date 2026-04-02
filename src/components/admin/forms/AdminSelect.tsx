"use client";

import { forwardRef } from "react";
import { adminFormStyles } from "@/lib/admin-ui";
import { brandColors } from "@/theme/branding";

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const AdminSelect = forwardRef<HTMLSelectElement, AdminSelectProps>(
  ({ children, ...props }, ref) => (
    <>
      <select
        ref={ref}
        {...props}
        style={{ ...adminFormStyles.select, ...props.style }}
        className="admin-field-select"
      >
        {children}
      </select>
      <style>{`
        .admin-field-select:focus {
          border-color: ${brandColors.gold[400]} !important;
          box-shadow: 0 0 0 3px ${brandColors.gold[100]} !important;
        }
      `}</style>
    </>
  ),
);

AdminSelect.displayName = "AdminSelect";
