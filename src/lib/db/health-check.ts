import { prisma } from "./prisma";

export interface HealthCheckResult {
  status: "healthy" | "degraded" | "unhealthy";
  database: {
    connected: boolean;
    latency: number;
    error?: string;
  };
  timestamp: string;
}

export async function checkDatabaseHealth(): Promise<HealthCheckResult> {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;

    return {
      status: latency < 100 ? "healthy" : "degraded",
      database: {
        connected: true,
        latency,
      },
      timestamp,
    };
  } catch (error) {
    return {
      status: "unhealthy",
      database: {
        connected: false,
        latency: Date.now() - start,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      timestamp,
    };
  }
}

export async function getDatabaseStats() {
  const [tableCount, connectionCount] = await Promise.all([
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `,
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) FROM pg_stat_activity 
      WHERE datname = current_database()
    `,
  ]);

  return {
    tables: Number(tableCount[0]?.count || 0),
    connections: Number(connectionCount[0]?.count || 0),
  };
}
