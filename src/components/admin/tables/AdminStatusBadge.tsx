import { Badge } from "@chakra-ui/react";

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

const colorSchemeMap: Record<BadgeVariant, string> = {
  success: "green",
  warning: "yellow",
  danger: "red",
  info: "blue",
  neutral: "gray",
  gold: "orange",
};

interface AdminStatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
}

/** Coloured pill badge for table status cells */
export function AdminStatusBadge({ status, variant }: AdminStatusBadgeProps) {
  const v = variant || statusVariantMap[status.toUpperCase()] || "neutral";
  const colorPalette = colorSchemeMap[v];

  return (
    <Badge
      colorPalette={colorPalette}
      variant="subtle"
      size="sm"
      borderRadius="full"
      px={2}
    >
      {status}
    </Badge>
  );
}
