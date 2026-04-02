// ─── Error Log Repository ────────────────────────────────

import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";
import type { ErrorContext } from "../errors/error-context";
import type { ErrorSeverity } from "../errors/error-severity";

export async function createErrorLog(data: {
  message: string;
  stack?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  requestId?: string;
  fingerprint?: string;
  severity: ErrorSeverity;
  context?: ErrorContext;
}) {
  return prisma.errorLog.create({
    data: {
      ...data,
      context: data.context as Prisma.InputJsonValue | undefined,
    },
  });
}

export async function getErrorLogs(filters: {
  severity?: ErrorSeverity;
  path?: string;
  fingerprint?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
} = {}) {
  const { severity, path, fingerprint, startDate, endDate, page = 1, limit = 50 } = filters;

  const where = {
    ...(severity && { severity }),
    ...(path && { path: { contains: path } }),
    ...(fingerprint && { fingerprint }),
    ...((startDate || endDate) && {
      createdAt: {
        ...(startDate && { gte: startDate }),
        ...(endDate && { lte: endDate }),
      },
    }),
  };

  const [logs, total] = await Promise.all([
    prisma.errorLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.errorLog.count({ where }),
  ]);

  return { logs, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getErrorStats(windowHours = 24) {
  const since = new Date(Date.now() - windowHours * 60 * 60 * 1000);

  const [total, bySeverity] = await Promise.all([
    prisma.errorLog.count({ where: { createdAt: { gte: since } } }),
    prisma.errorLog.groupBy({
      by: ["severity"],
      where: { createdAt: { gte: since } },
      _count: true,
    }),
  ]);

  return {
    total,
    bySeverity: Object.fromEntries(bySeverity.map((s: { severity: string; _count: number }) => [s.severity, s._count])),
    windowHours,
  };
}
