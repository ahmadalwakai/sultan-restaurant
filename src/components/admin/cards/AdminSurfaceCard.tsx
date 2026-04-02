import { type ReactNode } from "react";
import { adminCardStyles } from "@/lib/admin-ui";

interface AdminSurfaceCardProps {
  children: ReactNode;
  padding?: string;
  style?: React.CSSProperties;
}

/** Generic white card with border and shadow */
export function AdminSurfaceCard({ children, padding = "1.25rem", style }: AdminSurfaceCardProps) {
  return (
    <div style={{ ...adminCardStyles.surface, padding, ...style }}>
      {children}
    </div>
  );
}
