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

  const category = await prisma.shishaCategory.findUnique({
    where: { id },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });

  if (!category) {
    return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: category });
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
  if (body.description !== undefined) updateData.description = body.description;
  if (body.image !== undefined) updateData.image = body.image;
  if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;
  if (body.isActive !== undefined) updateData.isActive = body.isActive;

  const category = await prisma.shishaCategory.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({ success: true, data: category });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const itemCount = await prisma.shishaMenuItem.count({ where: { categoryId: id } });

  if (itemCount > 0) {
    return NextResponse.json(
      { success: false, error: `Cannot delete category with ${itemCount} items. Delete items first.` },
      { status: 400 }
    );
  }

  await prisma.shishaCategory.delete({ where: { id } });

  return NextResponse.json({ success: true, message: "Category deleted" });
}
