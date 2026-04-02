import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { logger } from "@/lib/monitoring/logging";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const retentionDays = Number(process.env.LOG_RETENTION_DAYS ?? "30");
  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

  const [errorResult, performanceResult, auditResult] = await Promise.all([
    prisma.errorLog.deleteMany({ where: { createdAt: { lt: cutoff } } }),
    prisma.performanceLog.deleteMany({ where: { createdAt: { lt: cutoff } } }),
    prisma.auditLog.deleteMany({ where: { createdAt: { lt: cutoff } } }),
  ]);

  const summary = {
    errorLogs: errorResult.count,
    performanceLogs: performanceResult.count,
    auditLogs: auditResult.count,
    retentionDays,
    cutoffDate: cutoff.toISOString(),
  };

  logger.info("CRON: cleanup-logs completed", summary);

  return NextResponse.json({ success: true, data: summary });
}
