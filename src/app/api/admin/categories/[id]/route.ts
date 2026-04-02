import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils/slugify";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await req.json();
  if (body.name) body.slug = slugify(body.name);
  const category = await prisma.category.update({ where: { id }, data: body });
  return NextResponse.json({ success: true, data: category });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ success: true, data: null });
}
