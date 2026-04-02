import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const original = await prisma.emailLog.findUnique({ where: { id } });
  if (!original) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  // TODO: Actually resend via email service
  return NextResponse.json({
    success: true,
    data: { message: `Email would be resent to ${original.to}` },
  });
}
