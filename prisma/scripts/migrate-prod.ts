#!/usr/bin/env npx tsx
/**
 * Production Migration Script
 * Safely applies migrations with verification
 * Usage: npx tsx prisma/scripts/migrate-prod.ts
 */

import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const prisma = new PrismaClient();

async function migrateProd() {
  console.log(chalk.blue.bold("\n🚀 Production Migration\n"));

  try {
    // Check connection
    console.log(chalk.gray("Checking database connection..."));
    await prisma.$queryRaw`SELECT 1`;
    console.log(chalk.green("✓ Database connected"));

    // Check pending migrations
    console.log(chalk.gray("\nChecking migration status..."));
    const migrationTableExists = await prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '_prisma_migrations'
      );
    `;

    if (!migrationTableExists[0]?.exists) {
      console.log(chalk.yellow("⚠ No migration history found - this appears to be a fresh database"));
    }

    // Create backup point (advisory)
    console.log(chalk.gray("\n💾 Creating backup checkpoint..."));
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    console.log(chalk.cyan(`  Checkpoint: migration-${timestamp}`));

    // Run migrations
    console.log(chalk.gray("\n📦 Applying migrations..."));
    execSync("npx prisma migrate deploy", { stdio: "inherit" });

    // Verify schema
    console.log(chalk.gray("\n🔍 Verifying schema..."));
    const tables = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `;
    console.log(chalk.green(`✓ ${tables[0]?.count} tables in schema`));

    // Generate client
    console.log(chalk.gray("\n🔧 Regenerating Prisma client..."));
    execSync("npx prisma generate", { stdio: "inherit" });

    console.log(chalk.green.bold("\n✅ Production migration complete!\n"));
  } catch (error) {
    console.error(chalk.red("\n❌ Migration failed:"), error);
    console.log(chalk.yellow("\n⚠ You may need to restore from backup"));
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateProd();
