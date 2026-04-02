import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  await requireAdmin();
  const offers = await prisma.offer.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: offers });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();
  const offer = await prisma.offer.create({ data: body });
  return NextResponse.json({ success: true, data: offer }, { status: 201 });
}
