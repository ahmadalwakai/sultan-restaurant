import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { comboService } from "@/lib/services";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const combo = await comboService.getById(id);
  return NextResponse.json({ success: true, data: combo });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const body = await req.json();
  const combo = await comboService.update(id, body);
  return NextResponse.json({ success: true, data: combo });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  await comboService.delete(id);
  return new NextResponse(null, { status: 204 });
}
