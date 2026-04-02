import { brandColors, brandRadii } from "@/theme/branding";

interface AdminStatProps {
  label: string;
  value: string | number;
  icon?: string;
}

/** Small inline stat (icon + value + label) for dashboard cards */
export function AdminStat({ label, value, icon }: AdminStatProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      {icon && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: brandRadii.lg,
            background: brandColors.gold[50],
            fontSize: "1.25rem",
          }}
        >
          {icon}
        </span>
      )}
      <div>
        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>
          {value}
        </div>
        <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{label}</div>
      </div>
    </div>
  );
}
