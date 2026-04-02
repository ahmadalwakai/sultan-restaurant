import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();
  const settings = await prisma.siteSetting.findMany();
  const mapped = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return NextResponse.json({ success: true, data: mapped });
}
