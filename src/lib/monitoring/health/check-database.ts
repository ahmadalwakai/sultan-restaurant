import prisma from "@/lib/db/prisma";
import type { HealthCheckResult } from "./health-types";

export async function checkDatabase(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      ok: true,
      latencyMs: Date.now() - start,
    };
  } catch (error) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      message: error instanceof Error ? error.message : "Database connection failed",
    };
  }
}
