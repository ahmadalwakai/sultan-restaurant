import { afterAll } from "vitest";
import { testDb } from "./db/test-db";

afterAll(async () => {
  await testDb.$disconnect();
});
