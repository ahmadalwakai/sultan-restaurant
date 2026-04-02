/**
 * PDF Menu Parser
 * Extracts menu items from PDF files
 * Requires pdf-parse package
 */

import * as fs from "fs";
import type { RawMenuItem } from "./normalize";

export async function parsePdf(filePath: string): Promise<RawMenuItem[]> {
  // Dynamic import to avoid bundling issues
  const pdfParse = await import("pdf-parse").then((m) => m.default);
  
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  
  const text = data.text;
  const items: RawMenuItem[] = [];
  
  // Split by lines and parse
  const lines = text.split("\n").filter((line: string) => line.trim());
  
  let currentCategory = "";
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect category headers (all caps or specific patterns)
    if (isCategoryHeader(line)) {
      currentCategory = parseCategory(line);
      continue;
    }
    
    // Try to parse as menu item
    const item = parseMenuLine(line, currentCategory);
    if (item) {
      items.push(item);
    }
  }
  
  return items;
}

function isCategoryHeader(line: string): boolean {
  // Category headers are typically:
  // - All uppercase
  // - Don't contain prices
  // - Are short (< 30 chars)
  const isUpperCase = line === line.toUpperCase();
  const hasPrice = /\d+\.\d{2}/.test(line);
  const isShort = line.length < 30;
  
  return isUpperCase && !hasPrice && isShort && line.length > 3;
}

function parseCategory(line: string): string {
  return line
    .toLowerCase()
    .replace(/[^a-z\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseMenuLine(line: string, category: string): RawMenuItem | null {
  // Common menu formats:
  // "Item Name     12.99"
  // "Item Name - Description     12.99"
  // "Item Name (V) 12.99"
  
  const priceMatch = line.match(/([\d]+\.\d{2})\s*$/);
  if (!priceMatch) return null;
  
  const price = parseFloat(priceMatch[1]);
  const beforePrice = line.substring(0, priceMatch.index).trim();
  
  // Check for dietary markers
  const isVegetarian = /\(V\)|\(VG\)|vegetarian/i.test(beforePrice);
  const isVegan = /\(VE\)|vegan/i.test(beforePrice);
  const isSpicy = /\(S\)|spicy|🌶/i.test(beforePrice);
  
  // Clean item name
  let name = beforePrice
    .replace(/\(V\)|\(VE\)|\(VG\)|\(S\)|\(GF\)/gi, "")
    .replace(/\s*-\s*$/, "")
    .trim();
  
  // Split name and description if has dash
  let description = "";
  const dashIndex = name.indexOf(" - ");
  if (dashIndex > 0) {
    description = name.substring(dashIndex + 3).trim();
    name = name.substring(0, dashIndex).trim();
  }
  
  if (!name || name.length < 2) return null;
  
  return {
    name,
    description: description || undefined,
    price,
    category,
    isVegetarian,
    isVegan,
    isSpicy,
  };
}
