import { testDb } from "./test-db";
import type { PrismaClient } from "@prisma/client";

type TransactionClient = Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0];

/**
 * Run a test inside a Prisma transaction that gets rolled back.
 * Keeps DB clean between tests without needing full truncation.
 */
export async function withTestTransaction(
  fn: (tx: TransactionClient) => Promise<void>
) {
  try {
    await testDb.$transaction(async (tx) => {
      await fn(tx);
      // Force rollback by throwing after test completes
      throw new RollbackError();
    });
  } catch (error) {
    if (!(error instanceof RollbackError)) {
      throw error;
    }
  }
}

class RollbackError extends Error {
  constructor() {
    super("Transaction rollback for test isolation");
    this.name = "RollbackError";
  }
}
