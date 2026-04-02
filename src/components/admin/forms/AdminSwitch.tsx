"use client";

import { brandColors, brandRadii } from "@/theme/branding";

interface AdminSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function AdminSwitch({ checked, onChange, label }: AdminSwitchProps) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        type="button"
        style={{
          position: "relative",
          width: "2.5rem",
          height: "1.375rem",
          borderRadius: brandRadii.full,
          background: checked ? brandColors.gold[500] : "#D1D5DB",
          border: "none",
          cursor: "pointer",
          transition: "background 0.2s",
          padding: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "0.125rem",
            left: checked ? "1.25rem" : "0.125rem",
            width: "1.125rem",
            height: "1.125rem",
            borderRadius: "50%",
            background: "#FFFFFF",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </button>
      {label && <span style={{ fontSize: "0.875rem", color: "#374151" }}>{label}</span>}
    </label>
  );
}
