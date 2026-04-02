export function toCSV<T extends Record<string, unknown>>(data: T[], columns: Array<{ key: string; header: string }>): string {
  const header = columns.map((c) => c.header).join(",");
  const rows = data.map((row) => columns.map((c) => {
    const val = String(row[c.key] ?? "");
    return val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
  }).join(","));
  return [header, ...rows].join("\n");
}
