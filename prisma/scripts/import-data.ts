#!/usr/bin/env npx tsx
/**
 * Data Import Script
 * Imports data from JSON export files
 * Usage: npx tsx prisma/scripts/import-data.ts --input=./backup/export-2024-01-01
 */

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

const prisma = new PrismaClient();

type ImportTable = "categories" | "menuItems" | "offers" | "coupons" | "openingHours" | "siteSettings" | "seoSettings";

const IMPORT_ORDER: ImportTable[] = [
  "categories",
  "menuItems",
  "offers",
  "coupons",
  "openingHours",
  "siteSettings",
  "seoSettings",
];

async function importData() {
  const args = process.argv.slice(2);
  const inputArg = args.find((a) => a.startsWith("--input="));
  const merge = args.includes("--merge");

  if (!inputArg) {
    console.error(chalk.red("\n❌ Missing --input argument\n"));
    console.log(chalk.gray("Usage: npx tsx prisma/scripts/import-data.ts --input=./path/to/export"));
    process.exit(1);
  }

  const inputDir = inputArg.split("=")[1];

  console.log(chalk.blue.bold("\n📥 Data Import\n"));
  console.log(chalk.gray(`Input: ${inputDir}`));
  console.log(chalk.gray(`Mode: ${merge ? "Merge" : "Replace"}\n`));

  try {
    // Check manifest
    const manifestPath = path.join(inputDir, "manifest.json");
    if (!fs.existsSync(manifestPath)) {
      throw new Error("manifest.json not found in import directory");
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    console.log(chalk.cyan(`Export from: ${manifest.exportedAt}`));
    console.log(chalk.cyan(`Total records: ${manifest.totalRecords}\n`));

    for (const table of IMPORT_ORDER) {
      const filePath = path.join(inputDir, `${table}.json`);
      if (!fs.existsSync(filePath)) {
        console.log(chalk.yellow(`  ⚠ Skipping ${table} (no file)`));
        continue;
      }

      console.log(chalk.gray(`  → Importing ${table}...`));
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (!merge) {
        // @ts-expect-error - dynamic table access
        await prisma[table].deleteMany();
      }

      for (const record of data) {
        // Remove auto-generated fields for upsert
        const { id, createdAt, updatedAt, ...rest } = record;
        
        // @ts-expect-error - dynamic table access
        await prisma[table].upsert({
          where: { id },
          create: { id, ...rest },
          update: rest,
        });
      }

      console.log(chalk.green(`    ✓ ${data.length} records`));
    }

    console.log(chalk.green.bold("\n✅ Import complete!\n"));
  } catch (error) {
    console.error(chalk.red("\n❌ Import failed:"), error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
