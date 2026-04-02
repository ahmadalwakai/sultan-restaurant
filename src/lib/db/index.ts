export { prisma } from "./prisma";
export { checkDatabaseHealth, getDatabaseStats, type HealthCheckResult } from "./health-check";
export { verifySeedData, getSeededCounts, type SeedVerificationResult } from "./verify-seed";
export { createPooledClient, disconnectPool, poolConfig } from "./connection-pool";
export {
  handlePrismaError,
  isDatabaseError,
  isNotFoundError,
  isDuplicateError,
  type DatabaseError,
} from "./error-handler";
export * from "./extensions";
