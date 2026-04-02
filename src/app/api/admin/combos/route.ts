import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { comboService } from "@/lib/services";

export async function GET() {
  await requireAdmin();
  const combos = await comboService.getAll();
  return NextResponse.json({ success: true, data: combos });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();
  const combo = await comboService.create(body);
  return NextResponse.json({ success: true, data: combo }, { status: 201 });
}
