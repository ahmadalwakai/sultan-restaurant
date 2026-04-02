import { adminTableStyles } from "@/lib/admin-ui";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "gold";

const statusVariantMap: Record<string, BadgeVariant> = {
  PENDING: "warning",
  CONFIRMED: "info",
  PREPARING: "info",
  READY: "gold",
  COMPLETED: "success",
  CANCELLED: "danger",
  ACTIVE: "success",
  INACTIVE: "neutral",
  EXPIRED: "danger",
  DRAFT: "neutral",
};

interface AdminStatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
}

/** Coloured pill badge for table status cells */
export function AdminStatusBadge({ status, variant }: AdminStatusBadgeProps) {
  const v = variant || statusVariantMap[status.toUpperCase()] || "neutral";
  const colors = adminTableStyles.badge[v];

  return (
    <span
      style={{
        ...adminTableStyles.badge.base,
        ...colors,
      }}
    >
      {status}
    </span>
  );
}
