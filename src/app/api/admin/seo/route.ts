import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();
  const seo = await prisma.seoSettings.findMany();
  return NextResponse.json({ success: true, data: seo });
}
