import { PrismaClient } from "@prisma/client";

const DATABASE_URL =
  process.env.DATABASE_URL_TEST ||
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/sultan_test";

export const testDb = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
  log: process.env.DEBUG_PRISMA ? ["query", "error"] : ["error"],
});
