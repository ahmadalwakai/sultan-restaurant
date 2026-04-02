import type { AdminPermission } from "./admin-permissions";
import { ADMIN_PERMISSIONS } from "./admin-permissions";

export function hasPermission(
  _role: string,
  permission: AdminPermission
): boolean {
  // For now, admin role has all permissions
  return ADMIN_PERMISSIONS.includes(permission);
}
