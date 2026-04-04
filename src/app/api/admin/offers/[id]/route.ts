import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

// Transform DB response to frontend format
function toFrontend(offer: { discount: unknown; [key: string]: unknown }) {
  const { discount, ...rest } = offer;
  return { ...rest, discountValue: Number(discount) };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: toFrontend(offer) });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await req.json();
  
  // Map frontend field names to schema field names
  const { discountValue, ...rest } = body;
  const data = {
    ...rest,
    ...(discountValue !== undefined && { discount: discountValue }),
  };
  
  const offer = await prisma.offer.update({ where: { id }, data });
  return NextResponse.json({ success: true, data: toFrontend(offer) });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  await prisma.offer.delete({ where: { id } });
  return NextResponse.json({ success: true, data: null });
}
