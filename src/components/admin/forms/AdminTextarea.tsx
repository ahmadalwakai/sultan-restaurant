"use client";

import { forwardRef } from "react";
import { adminFormStyles } from "@/lib/admin-ui";
import { brandColors } from "@/theme/branding";

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const AdminTextarea = forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  (props, ref) => (
    <>
      <textarea
        ref={ref}
        {...props}
        style={{ ...adminFormStyles.textarea, ...props.style }}
        className="admin-field-textarea"
      />
      <style>{`
        .admin-field-textarea:focus {
          border-color: ${brandColors.gold[400]} !important;
          box-shadow: 0 0 0 3px ${brandColors.gold[100]} !important;
        }
      `}</style>
    </>
  ),
);

AdminTextarea.displayName = "AdminTextarea";
