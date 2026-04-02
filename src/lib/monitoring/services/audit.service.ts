// ─── Audit Service ───────────────────────────────────────

import { createAuditLog, getAuditLogs } from "../repositories/audit-log.repository";
import { logAudit } from "../logging";
import type { AuditAction, AuditLogFilters } from "@/types/audit";

export async function recordAuditEvent(params: {
  adminId: string;
  adminEmail: string;
  action: AuditAction;
  entity: string;
  entityId?: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}) {
  // Log to structured logging
  logAudit(params);

  // Persist to database
  return createAuditLog(params);
}

export async function queryAuditLogs(filters: AuditLogFilters) {
  return getAuditLogs(filters);
}
