#!/usr/bin/env npx tsx
/**
 * Reset Database Script
 * Drops all tables and re-runs migrations + seeds
 * Usage: npx tsx prisma/scripts/reset-db.ts [--seed]
 */

import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const prisma = new PrismaClient();

async function resetDatabase() {
  const args = process.argv.slice(2);
  const shouldSeed = args.includes("--seed") || args.includes("-s");
  const force = args.includes("--force") || args.includes("-f");

  console.log(chalk.yellow.bold("\n⚠️  DATABASE RESET WARNING\n"));
  console.log(chalk.red("This will DROP ALL DATA and reset the database."));

  if (!force) {
    console.log(chalk.gray("\nUse --force to skip this check.\n"));
    console.log(chalk.cyan("Proceeding in 5 seconds... (Ctrl+C to cancel)"));
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  try {
    console.log(chalk.blue("\n📦 Resetting database..."));

    // Drop all tables using Prisma
    console.log(chalk.gray("  → Dropping all tables..."));
    await prisma.$executeRawUnsafe(`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
          EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;
      END $$;
    `);

    // Drop enums
    console.log(chalk.gray("  → Dropping enum types..."));
    await prisma.$executeRawUnsafe(`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT typname FROM pg_type t JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typtype = 'e') LOOP
          EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
        END LOOP;
      END $$;
    `);

    // Run migrations
    console.log(chalk.gray("  → Running migrations..."));
    execSync("npx prisma migrate deploy", { stdio: "inherit" });

    // Seed if requested
    if (shouldSeed) {
      console.log(chalk.gray("  → Seeding database..."));
      execSync("npx tsx prisma/seed.ts full", { stdio: "inherit" });
    }

    console.log(chalk.green.bold("\n✅ Database reset complete!\n"));
  } catch (error) {
    console.error(chalk.red("\n❌ Reset failed:"), error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
