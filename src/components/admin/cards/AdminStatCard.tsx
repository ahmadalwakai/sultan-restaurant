import { brandColors, brandRadii } from "@/theme/branding";
import { adminCardStyles } from "@/lib/admin-ui";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: { value: string; positive: boolean };
}

/** Dashboard KPI card with icon, value, label, and optional trend */
export function AdminStatCard({ label, value, icon, trend }: AdminStatCardProps) {
  return (
    <div style={adminCardStyles.stat} className="admin-stat-card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "0.75rem", color: "#6B7280", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {label}
          </p>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>{value}</p>
          {trend && (
            <span
              style={{
                display: "inline-block",
                marginTop: "0.375rem",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: trend.positive ? "#059669" : "#DC2626",
              }}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
        {icon && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: brandRadii.lg,
              background: brandColors.gold[50],
              fontSize: "1.25rem",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        )}
      </div>

      <style>{`
        .admin-stat-card { transition: box-shadow 0.2s, transform 0.2s; }
        .admin-stat-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
