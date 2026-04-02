import { adminCardStyles } from "@/lib/admin-ui";

interface AdminInfoCardProps {
  title: string;
  children: React.ReactNode;
}

/** Card with a title header and body content */
export function AdminInfoCard({ title, children }: AdminInfoCardProps) {
  return (
    <div style={{ ...adminCardStyles.surface, overflow: "hidden" }}>
      <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #F3F4F6" }}>
        <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#111827" }}>{title}</h3>
      </div>
      <div style={{ padding: "1.25rem" }}>
        {children}
      </div>
    </div>
  );
}
