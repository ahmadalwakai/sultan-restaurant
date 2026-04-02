#!/usr/bin/env npx tsx
/**
 * Schema Validation Script
 * Validates Prisma schema and checks database consistency
 * Usage: npx tsx prisma/scripts/validate-schema.ts
 */

import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const prisma = new PrismaClient();

async function validateSchema() {
  console.log(chalk.blue.bold("\n🔍 Schema Validation\n"));

  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // 1. Validate Prisma schema file
    console.log(chalk.gray("Validating Prisma schema..."));
    try {
      execSync("npx prisma validate", { stdio: "pipe" });
      console.log(chalk.green("✓ Schema syntax is valid"));
    } catch {
      errors.push("Prisma schema validation failed");
      console.log(chalk.red("✗ Schema syntax errors found"));
    }

    // 2. Check database connection
    console.log(chalk.gray("\nChecking database connection..."));
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log(chalk.green("✓ Database connected"));
    } catch (e) {
      errors.push(`Database connection failed: ${e}`);
      console.log(chalk.red("✗ Cannot connect to database"));
    }

    // 3. Check required tables exist
    console.log(chalk.gray("\nChecking required tables..."));
    const requiredTables = [
      "categories",
      "menu_items",
      "orders",
      "order_items",
      "bookings",
      "users",
      "admins",
      "site_settings",
    ];

    for (const table of requiredTables) {
      const exists = await prisma.$queryRaw<{ exists: boolean }[]>`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = ${table}
        );
      `;
      
      if (exists[0]?.exists) {
        console.log(chalk.green(`  ✓ ${table}`));
      } else {
        warnings.push(`Table missing: ${table}`);
        console.log(chalk.yellow(`  ⚠ ${table} (missing)`));
      }
    }

    // 4. Check for orphaned records
    console.log(chalk.gray("\nChecking data integrity..."));
    
    // Menu items without categories
    const orphanedItems = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) FROM menu_items mi 
      LEFT JOIN categories c ON mi.category_id = c.id 
      WHERE c.id IS NULL;
    `;
    if (Number(orphanedItems[0]?.count) > 0) {
      warnings.push(`${orphanedItems[0]?.count} menu items without categories`);
      console.log(chalk.yellow(`  ⚠ ${orphanedItems[0]?.count} orphaned menu items`));
    } else {
      console.log(chalk.green("  ✓ No orphaned menu items"));
    }

    // 5. Check indexes
    console.log(chalk.gray("\nChecking indexes..."));
    const indexes = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public';
    `;
    console.log(chalk.green(`  ✓ ${indexes[0]?.count} indexes found`));

    // Summary
    console.log(chalk.blue.bold("\n📋 Summary\n"));
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log(chalk.green.bold("✅ All checks passed!\n"));
    } else {
      if (errors.length > 0) {
        console.log(chalk.red(`❌ ${errors.length} error(s):`));
        errors.forEach((e) => console.log(chalk.red(`   - ${e}`)));
      }
      if (warnings.length > 0) {
        console.log(chalk.yellow(`⚠ ${warnings.length} warning(s):`));
        warnings.forEach((w) => console.log(chalk.yellow(`   - ${w}`)));
      }
      console.log();
    }

    process.exit(errors.length > 0 ? 1 : 0);
  } catch (error) {
    console.error(chalk.red("\n❌ Validation failed:"), error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

validateSchema();
