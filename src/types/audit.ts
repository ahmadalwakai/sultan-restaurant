// ─── Audit Types ─────────────────────────────────────────

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "STATUS_CHANGE"
  | "EXPORT"
  | "IMPORT"
  | "SETTINGS_UPDATE"
  | "REFUND";

export interface AuditEntry {
  id: string;
  adminId: string;
  adminEmail: string;
  action: AuditAction;
  entity: string;
  entityId?: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface AuditLogFilters {
  adminId?: string;
  action?: AuditAction;
  entity?: string;
  entityId?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}
