import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

// Get single table with bookings
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const table = await prisma.restaurantTable.findUnique({
    where: { id },
    include: {
      bookings: {
        where: {
          status: { in: ["PENDING", "CONFIRMED"] },
        },
        orderBy: [{ date: "asc" }, { time: "asc" }],
        take: 20,
      },
    },
  });

  if (!table) {
    return NextResponse.json(
      { success: false, error: "Table not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: table });
}

// Update table (toggle availability, change capacity)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await req.json();

  const table = await prisma.restaurantTable.update({
    where: { id },
    data: {
      capacity: body.capacity,
      isActive: body.isActive,
    },
  });

  return NextResponse.json({ success: true, data: table });
}

// Delete table
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  // Check if table has active bookings
  const activeBookings = await prisma.booking.count({
    where: {
      tableId: id,
      status: { in: ["PENDING", "CONFIRMED"] },
      date: { gte: new Date() },
    },
  });

  if (activeBookings > 0) {
    return NextResponse.json(
      { success: false, error: `Cannot delete table with ${activeBookings} active booking(s)` },
      { status: 400 }
    );
  }

  await prisma.restaurantTable.delete({ where: { id } });

  return NextResponse.json({ success: true, message: "Table deleted" });
}
