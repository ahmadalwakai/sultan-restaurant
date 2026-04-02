// ─── Audit Log Repository ────────────────────────────────

import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";
import type { AuditAction, AuditLogFilters } from "@/types/audit";

export async function createAuditLog(data: {
  adminId: string;
  adminEmail: string;
  action: AuditAction;
  entity: string;
  entityId?: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}) {
  return prisma.auditLog.create({
    data: {
      ...data,
      action: data.action as string,
      changes: data.changes as Prisma.InputJsonValue | undefined,
    },
  });
}

export async function getAuditLogs(filters: AuditLogFilters = {}) {
  const { adminId, action, entity, entityId, startDate, endDate, page = 1, limit = 50 } = filters;

  const where = {
    ...(adminId && { adminId }),
    ...(action && { action }),
    ...(entity && { entity }),
    ...(entityId && { entityId }),
    ...((startDate || endDate) && {
      createdAt: {
        ...(startDate && { gte: startDate }),
        ...(endDate && { lte: endDate }),
      },
    }),
  };

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return { logs, total, page, limit, totalPages: Math.ceil(total / limit) };
}
