import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  await requireAdmin();
  const { key } = await params;

  // Sanitize to prevent directory traversal
  const sanitized = path.basename(key);
  const filePath = path.join(process.cwd(), "public", "uploads", sanitized);

  try {
    await unlink(filePath);
  } catch {
    return NextResponse.json({ success: false, error: "File not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: null });
}
