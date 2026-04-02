#!/usr/bin/env npx tsx
/**
 * Data Export Script
 * Exports database data to JSON files for backup/transfer
 * Usage: npx tsx prisma/scripts/export-data.ts [--output=./backup]
 */

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

const prisma = new PrismaClient();

type ExportTable = "categories" | "menuItems" | "offers" | "coupons" | "reviews" | "openingHours" | "siteSettings" | "seoSettings";

const EXPORTABLE_TABLES: ExportTable[] = [
  "categories",
  "menuItems",
  "offers",
  "coupons",
  "reviews",
  "openingHours",
  "siteSettings",
  "seoSettings",
];

async function exportData() {
  const args = process.argv.slice(2);
  const outputArg = args.find((a) => a.startsWith("--output="));
  const outputDir = outputArg?.split("=")[1] || "./prisma/exports";
  const timestamp = new Date().toISOString().split("T")[0];
  const exportPath = path.join(outputDir, `export-${timestamp}`);

  console.log(chalk.blue.bold("\n📤 Data Export\n"));
  console.log(chalk.gray(`Output: ${exportPath}`));

  try {
    // Create export directory
    fs.mkdirSync(exportPath, { recursive: true });

    const manifest: Record<string, number> = {};

    for (const table of EXPORTABLE_TABLES) {
      console.log(chalk.gray(`  → Exporting ${table}...`));
      
      // @ts-expect-error - dynamic table access
      const data = await prisma[table].findMany();
      
      const filePath = path.join(exportPath, `${table}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      
      manifest[table] = data.length;
      console.log(chalk.green(`    ✓ ${data.length} records`));
    }

    // Write manifest
    const manifestPath = path.join(exportPath, "manifest.json");
    fs.writeFileSync(
      manifestPath,
      JSON.stringify(
        {
          exportedAt: new Date().toISOString(),
          tables: manifest,
          totalRecords: Object.values(manifest).reduce((a, b) => a + b, 0),
        },
        null,
        2
      )
    );

    console.log(chalk.green.bold(`\n✅ Export complete: ${exportPath}\n`));
  } catch (error) {
    console.error(chalk.red("\n❌ Export failed:"), error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();
