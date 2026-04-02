/**
 * Database Connection Pool Configuration
 *
 * For Prisma with Neon PostgreSQL, connection pooling is typically
 * handled at the provider level (PgBouncer on Neon).
 *
 * This file provides utilities for connection management.
 */

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prismaPool: PrismaClient | undefined;
}

export const poolConfig = {
  // Connection pool size (Prisma default is 2 per CPU)
  connectionLimit: parseInt(process.env.DATABASE_POOL_SIZE || "10", 10),

  // Time to acquire connection before timeout
  connectionTimeout: parseInt(process.env.DATABASE_TIMEOUT || "10000", 10),

  // Maximum time a query can run
  queryTimeout: parseInt(process.env.DATABASE_QUERY_TIMEOUT || "30000", 10),
};

export function createPooledClient(): PrismaClient {
  // In development, reuse the client to prevent "too many connections"
  if (process.env.NODE_ENV === "development") {
    if (!global.__prismaPool) {
      global.__prismaPool = new PrismaClient({
        log:
          process.env.DEBUG_PRISMA === "true"
            ? ["query", "info", "warn", "error"]
            : ["error"],
      });
    }
    return global.__prismaPool;
  }

  // In production, create new client (serverless pattern)
  return new PrismaClient({
    log: ["error"],
  });
}

export async function disconnectPool() {
  if (global.__prismaPool) {
    await global.__prismaPool.$disconnect();
    global.__prismaPool = undefined;
  }
}

// Graceful shutdown handling
if (typeof process !== "undefined") {
  process.on("beforeExit", async () => {
    await disconnectPool();
  });
}
