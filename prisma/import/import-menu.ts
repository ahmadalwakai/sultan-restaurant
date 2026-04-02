#!/usr/bin/env npx tsx
/**
 * Menu Import Tool
 * Imports menu items from various file formats (PDF, CSV, JSON)
 * Usage: npx tsx prisma/import/import-menu.ts --file=menu.pdf [--format=pdf]
 */

import { PrismaClient } from "@prisma/client";
import * as path from "path";
import chalk from "chalk";
import { parsePdf } from "./parsers/pdf-parser";
import { parseCsv } from "./parsers/csv-parser";
import { parseJson } from "./parsers/json-parser";
import { normalizeMenuData, type RawMenuItem } from "./parsers/normalize";
import { generateSlug } from "../utils/slug-generator";
import { getMenuItemImage } from "../utils/seed-images";

const prisma = new PrismaClient();

type FileFormat = "pdf" | "csv" | "json";

function detectFormat(filePath: string): FileFormat {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".pdf": return "pdf";
    case ".csv": return "csv";
    case ".json": return "json";
    default: throw new Error(`Unsupported file format: ${ext}`);
  }
}

async function importMenu() {
  const args = process.argv.slice(2);
  const fileArg = args.find((a) => a.startsWith("--file="));
  const formatArg = args.find((a) => a.startsWith("--format="));
  const dryRun = args.includes("--dry-run");
  const update = args.includes("--update");

  if (!fileArg) {
    console.error(chalk.red("\n❌ Missing --file argument\n"));
    console.log(chalk.gray("Usage: npx tsx prisma/import/import-menu.ts --file=menu.pdf"));
    process.exit(1);
  }

  const filePath = fileArg.split("=")[1];
  const format = (formatArg?.split("=")[1] as FileFormat) || detectFormat(filePath);

  console.log(chalk.blue.bold("\n📥 Menu Import Tool\n"));
  console.log(chalk.gray(`File: ${filePath}`));
  console.log(chalk.gray(`Format: ${format}`));
  console.log(chalk.gray(`Mode: ${dryRun ? "Dry Run" : update ? "Update" : "Insert"}\n`));

  try {
    // Parse file based on format
    let rawItems: RawMenuItem[];
    switch (format) {
      case "pdf":
        rawItems = await parsePdf(filePath);
        break;
      case "csv":
        rawItems = await parseCsv(filePath);
        break;
      case "json":
        rawItems = await parseJson(filePath);
        break;
    }

    console.log(chalk.cyan(`Parsed ${rawItems.length} items\n`));

    // Normalize data
    const normalizedItems = normalizeMenuData(rawItems);
    console.log(chalk.cyan(`Normalized ${normalizedItems.length} items\n`));

    if (dryRun) {
      console.log(chalk.yellow("Dry run - no changes made"));
      console.log(chalk.gray("\nParsed items:"));
      normalizedItems.slice(0, 10).forEach((item) => {
        console.log(chalk.gray(`  - ${item.name} (${item.category}) - £${item.price}`));
      });
      if (normalizedItems.length > 10) {
        console.log(chalk.gray(`  ... and ${normalizedItems.length - 10} more`));
      }
      return;
    }

    // Get or create categories
    const categories = await prisma.category.findMany();
    const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

    // Import items
    let imported = 0;
    let updated = 0;
    let skipped = 0;

    for (const item of normalizedItems) {
      const categoryId = categoryMap.get(item.category);
      if (!categoryId) {
        console.log(chalk.yellow(`  ⚠ Skipping ${item.name} - unknown category: ${item.category}`));
        skipped++;
        continue;
      }

      const slug = generateSlug(item.name);
      const existing = await prisma.menuItem.findUnique({ where: { slug } });

      if (existing && !update) {
        skipped++;
        continue;
      }

      if (existing && update) {
        await prisma.menuItem.update({
          where: { slug },
          data: { price: item.price, description: item.description },
        });
        updated++;
      } else {
        await prisma.menuItem.create({
          data: {
            name: item.name,
            slug,
            description: item.description,
            price: item.price,
            categoryId,
            image: getMenuItemImage(item.name, item.category),
            isVegetarian: item.isVegetarian ?? false,
            isVegan: item.isVegan ?? false,
            isSpicy: item.isSpicy ?? false,
            allergens: item.allergens ?? [],
          },
        });
        imported++;
      }
    }

    console.log(chalk.green.bold("\n✅ Import complete!"));
    console.log(chalk.green(`  Imported: ${imported}`));
    console.log(chalk.blue(`  Updated: ${updated}`));
    console.log(chalk.yellow(`  Skipped: ${skipped}\n`));
  } catch (error) {
    console.error(chalk.red("\n❌ Import failed:"), error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importMenu();
