// ─── Performance Log Repository ──────────────────────────

import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export async function createPerformanceLog(data: {
  path: string;
  method?: string;
  durationMs: number;
  type?: string;
  statusCode?: number;
  requestId?: string;
  metadata?: Record<string, unknown>;
}) {
  return prisma.performanceLog.create({
    data: {
      ...data,
      metadata: data.metadata as Prisma.InputJsonValue | undefined,
    },
  });
}

export async function getPerformanceLogs(filters: {
  type?: string;
  path?: string;
  minDuration?: number;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
} = {}) {
  const { type, path, minDuration, startDate, endDate, page = 1, limit = 50 } = filters;

  const where = {
    ...(type && { type }),
    ...(path && { path: { contains: path } }),
    ...(minDuration && { durationMs: { gte: minDuration } }),
    ...((startDate || endDate) && {
      createdAt: {
        ...(startDate && { gte: startDate }),
        ...(endDate && { lte: endDate }),
      },
    }),
  };

  const [logs, total] = await Promise.all([
    prisma.performanceLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.performanceLog.count({ where }),
  ]);

  return { logs, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getPerformanceStats(windowHours = 24) {
  const since = new Date(Date.now() - windowHours * 60 * 60 * 1000);

  const stats = await prisma.performanceLog.aggregate({
    where: { createdAt: { gte: since } },
    _count: true,
    _avg: { durationMs: true },
    _max: { durationMs: true },
    _min: { durationMs: true },
  });

  const slowRequests = await prisma.performanceLog.count({
    where: { createdAt: { gte: since }, durationMs: { gte: 3000 } },
  });

  return {
    count: stats._count,
    avgDurationMs: Math.round(stats._avg.durationMs ?? 0),
    maxDurationMs: Math.round(stats._max.durationMs ?? 0),
    minDurationMs: Math.round(stats._min.durationMs ?? 0),
    slowRequests,
    windowHours,
  };
}
