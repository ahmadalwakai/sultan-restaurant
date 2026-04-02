// ─── Audit Logger ────────────────────────────────────────

import { logger } from "./logger";
import type { AuditAction } from "@/types/audit";

export function logAudit(params: {
  adminId: string;
  adminEmail: string;
  action: AuditAction;
  entity: string;
  entityId?: string;
  changes?: Record<string, unknown>;
}): void {
  logger.info(`AUDIT: ${params.adminEmail} ${params.action} ${params.entity}${params.entityId ? `/${params.entityId}` : ""}`, {
    audit: true,
    adminId: params.adminId,
    action: params.action,
    entity: params.entity,
    entityId: params.entityId,
    changes: params.changes,
  });
}
