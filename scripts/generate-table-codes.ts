/**
 * Generate QR Codes and PDF for Table Scan Ordering
 *
 * Usage: npx tsx scripts/generate-table-codes.ts
 *
 * This script generates:
 * - Individual QR code PNG files for each table
 * - A single PDF document with all QR codes for printing
 */

import * as QRCode from "qrcode";
import { jsPDF } from "jspdf";
import * as fs from "fs";
import * as path from "path";

// Configuration
const CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || "https://sultanresturant.co.uk",
  restaurantTables: 10,
  shishaTables: 10,
  outputDir: "public/qr-codes",
  qrSize: 300, // pixels for PNG
  pdfQrSize: 60, // mm in PDF
};

interface TableQR {
  type: "restaurant" | "shisha";
  number: number;
  url: string;
  filename: string;
}

async function generateQRData(): Promise<TableQR[]> {
  const tables: TableQR[] = [];

  // Restaurant tables
  for (let i = 1; i <= CONFIG.restaurantTables; i++) {
    tables.push({
      type: "restaurant",
      number: i,
      url: `${CONFIG.baseUrl}/order/table/restaurant/${i}`,
      filename: `restaurant-table-${i}.png`,
    });
  }

  // Shisha tables
  for (let i = 1; i <= CONFIG.shishaTables; i++) {
    tables.push({
      type: "shisha",
      number: i,
      url: `${CONFIG.baseUrl}/order/table/shisha/${i}`,
      filename: `shisha-table-${i}.png`,
    });
  }

  return tables;
}

async function generateQRCodes(tables: TableQR[]): Promise<void> {
  // Create output directory
  const outputPath = path.join(process.cwd(), CONFIG.outputDir);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  console.log(`\n📁 Output directory: ${outputPath}\n`);

  for (const table of tables) {
    const filePath = path.join(outputPath, table.filename);
    await QRCode.toFile(filePath, table.url, {
      width: CONFIG.qrSize,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
    console.log(`✅ Generated: ${table.filename}`);
  }
}

async function generatePDF(tables: TableQR[]): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const qrSize = CONFIG.pdfQrSize;
  const labelHeight = 10;
  const cardPadding = 5;
  const cardWidth = qrSize + cardPadding * 2;
  const cardHeight = qrSize + labelHeight + cardPadding * 3;

  // Calculate grid
  const cols = Math.floor((pageWidth - 2 * margin) / cardWidth);
  const rows = Math.floor((pageHeight - 2 * margin) / cardHeight);
  const itemsPerPage = cols * rows;

  // Center the grid
  const gridWidth = cols * cardWidth;
  const gridHeight = rows * cardHeight;
  const startX = (pageWidth - gridWidth) / 2;
  const startY = (pageHeight - gridHeight) / 2;

  let currentItem = 0;

  // Generate Restaurant tables section
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Sultan Restaurant - Table QR Codes", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Scan to order from your table", pageWidth / 2, 28, { align: "center" });

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];

    // Check if we need a new page
    if (currentItem > 0 && currentItem % itemsPerPage === 0) {
      doc.addPage();
      currentItem = 0;
    }

    // Calculate position
    const col = currentItem % cols;
    const row = Math.floor(currentItem / cols) % rows;
    const x = startX + col * cardWidth;
    const y = startY + row * cardHeight + (i === 0 ? 20 : 0); // Extra offset for title on first page

    // Draw card border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.roundedRect(x, y, cardWidth, cardHeight, 3, 3);

    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(table.url, {
      width: 200,
      margin: 1,
    });

    // Add QR code image
    doc.addImage(qrDataUrl, "PNG", x + cardPadding, y + cardPadding, qrSize, qrSize);

    // Add label
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    const label = table.type === "restaurant" ? `Table ${table.number}` : `Shisha ${table.number}`;
    doc.text(label, x + cardWidth / 2, y + qrSize + cardPadding * 2 + 3, { align: "center" });

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    const typeLabel = table.type === "restaurant" ? "Restaurant" : "Shisha Lounge";
    doc.text(typeLabel, x + cardWidth / 2, y + qrSize + cardPadding * 2 + 8, { align: "center" });

    currentItem++;
  }

  // Save PDF
  const pdfPath = path.join(process.cwd(), CONFIG.outputDir, "table-qr-codes.pdf");
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
  fs.writeFileSync(pdfPath, pdfBuffer);
  console.log(`\n📄 Generated PDF: ${pdfPath}`);
}

async function main() {
  console.log("🚀 Sultan Restaurant - QR Code Generator\n");
  console.log(`Base URL: ${CONFIG.baseUrl}`);
  console.log(`Restaurant Tables: ${CONFIG.restaurantTables}`);
  console.log(`Shisha Tables: ${CONFIG.shishaTables}`);

  const tables = await generateQRData();

  console.log("\n📱 Generating QR Code PNG files...");
  await generateQRCodes(tables);

  console.log("\n📑 Generating printable PDF...");
  await generatePDF(tables);

  console.log("\n✨ Done! QR codes are ready for printing.\n");
  console.log("Files generated:");
  console.log(`  - ${CONFIG.restaurantTables + CONFIG.shishaTables} PNG files`);
  console.log("  - 1 PDF document (table-qr-codes.pdf)");
  console.log(`\nLocation: ${path.join(process.cwd(), CONFIG.outputDir)}`);
}

main().catch(console.error);
