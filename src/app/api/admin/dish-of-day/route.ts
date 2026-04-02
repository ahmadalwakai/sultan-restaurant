import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { dishOfDayService } from "@/lib/services";

export async function GET() {
  await requireAdmin();
  const items = await dishOfDayService.getRecent(30);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();
  const dod = await dishOfDayService.create(body);
  return NextResponse.json({ success: true, data: dod }, { status: 201 });
}
