/**
 * Generate QR Codes and PDFs for Table Scan Ordering
 *
 * Usage: npx tsx scripts/generate-table-codes.ts
 *
 * This script generates:
 * - Individual QR code PNG files for each table
 * - Two PDF documents: one for restaurant tables, one for shisha tables
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

async function generateSinglePDF(
  tables: TableQR[],
  title: string,
  subtitle: string,
  filename: string
): Promise<void> {
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
  const rows = Math.floor((pageHeight - 2 * margin - 30) / cardHeight); // 30mm for title area
  const itemsPerPage = cols * rows;

  // Center the grid
  const gridWidth = cols * cardWidth;
  const startX = (pageWidth - gridWidth) / 2;
  const startY = 45; // Start after title area

  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(title, pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(subtitle, pageWidth / 2, 28, { align: "center" });

  let currentItem = 0;

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];

    // Check if we need a new page
    if (currentItem > 0 && currentItem % itemsPerPage === 0) {
      doc.addPage();
      // Re-add title on new page
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(title, pageWidth / 2, 20, { align: "center" });
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(subtitle, pageWidth / 2, 28, { align: "center" });
      currentItem = 0;
    }

    // Calculate position
    const col = currentItem % cols;
    const row = Math.floor(currentItem / cols) % rows;
    const x = startX + col * cardWidth;
    const y = startY + row * cardHeight;

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
    const label = `Table ${table.number}`;
    doc.text(label, x + cardWidth / 2, y + qrSize + cardPadding * 2 + 3, { align: "center" });

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    const typeLabel = table.type === "restaurant" ? "Scan to Order" : "Scan to Order";
    doc.text(typeLabel, x + cardWidth / 2, y + qrSize + cardPadding * 2 + 8, { align: "center" });

    currentItem++;
  }

  // Save PDF
  const pdfPath = path.join(process.cwd(), CONFIG.outputDir, filename);
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
  fs.writeFileSync(pdfPath, pdfBuffer);
  console.log(`📄 Generated PDF: ${filename}`);
}

async function generatePDFs(tables: TableQR[]): Promise<void> {
  // Split tables by type
  const restaurantTables = tables.filter((t) => t.type === "restaurant");
  const shishaTables = tables.filter((t) => t.type === "shisha");

  // Generate restaurant PDF
  await generateSinglePDF(
    restaurantTables,
    "Sultan Restaurant - Table QR Codes",
    "Scan to order from your table",
    "restaurant-table-codes.pdf"
  );

  // Generate shisha PDF
  await generateSinglePDF(
    shishaTables,
    "Sultan Shisha Lounge - Table QR Codes",
    "Scan to order shisha from your table",
    "shisha-table-codes.pdf"
  );
}

async function main() {
  console.log("🚀 Sultan Restaurant - QR Code Generator\n");
  console.log(`Base URL: ${CONFIG.baseUrl}`);
  console.log(`Restaurant Tables: ${CONFIG.restaurantTables}`);
  console.log(`Shisha Tables: ${CONFIG.shishaTables}`);

  const tables = await generateQRData();

  console.log("\n📱 Generating QR Code PNG files...");
  await generateQRCodes(tables);

  console.log("\n📑 Generating printable PDFs...");
  await generatePDFs(tables);

  console.log("\n✨ Done! QR codes are ready for printing.\n");
  console.log("Files generated:");
  console.log(`  - ${CONFIG.restaurantTables + CONFIG.shishaTables} PNG files`);
  console.log("  - restaurant-table-codes.pdf (Restaurant tables)");
  console.log("  - shisha-table-codes.pdf (Shisha lounge tables)");
  console.log(`\nLocation: ${path.join(process.cwd(), CONFIG.outputDir)}`);
}

main().catch(console.error);
