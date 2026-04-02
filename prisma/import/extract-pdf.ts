/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const pdfParse = require("pdf-parse");

async function extractMenu() {
  const buffer = fs.readFileSync("./public/menu.pdf");
  const data = await pdfParse(buffer);
  
  console.log("=== PDF INFO ===");
  console.log("Pages:", data.numpages);
  console.log("\n=== EXTRACTED TEXT ===\n");
  console.log(data.text);
  
  // Save to file for analysis
  fs.writeFileSync(
    "./prisma/import/data/menu-extracted.txt",
    data.text,
    "utf-8"
  );
  console.log("\n=== Saved to prisma/import/data/menu-extracted.txt ===");
}

extractMenu().catch(console.error);
