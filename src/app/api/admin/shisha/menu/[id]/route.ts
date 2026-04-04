import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/utils/slugify";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const item = await prisma.shishaMenuItem.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!item) {
    return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: item });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};

  if (body.name) {
    updateData.name = body.name;
    updateData.slug = slugify(body.name);
  }
  if (body.categoryId) updateData.categoryId = body.categoryId;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.price !== undefined) updateData.price = body.price;
  if (body.discountedPrice !== undefined) updateData.discountedPrice = body.discountedPrice;
  if (body.image !== undefined) updateData.image = body.image;
  if (body.images !== undefined) updateData.images = body.images;
  if (body.isAvailable !== undefined) updateData.isAvailable = body.isAvailable;
  if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured;
  if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;
  if (body.tags !== undefined) updateData.tags = body.tags;
  if (body.intensity !== undefined) updateData.intensity = body.intensity;

  const item = await prisma.shishaMenuItem.update({
    where: { id },
    data: updateData,
    include: { category: true },
  });

  return NextResponse.json({ success: true, data: item });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  await prisma.shishaMenuItem.delete({ where: { id } });

  return NextResponse.json({ success: true, message: "Item deleted" });
}
