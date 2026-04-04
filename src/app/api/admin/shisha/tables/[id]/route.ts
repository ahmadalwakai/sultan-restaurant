import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const table = await prisma.shishaTable.findUnique({
    where: { id },
    include: {
      bookings: {
        where: { status: { in: ["PENDING", "CONFIRMED"] } },
        orderBy: [{ bookingDate: "asc" }, { bookingTime: "asc" }],
        take: 20,
      },
    },
  });

  if (!table) {
    return NextResponse.json({ success: false, error: "Table not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: table });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await req.json();

  const table = await prisma.shishaTable.update({
    where: { id },
    data: {
      name: body.name,
      capacity: body.capacity,
      status: body.status,
      isActive: body.isActive,
      notes: body.notes,
    },
  });

  return NextResponse.json({ success: true, data: table });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const activeBookings = await prisma.shishaBooking.count({
    where: {
      tableId: id,
      status: { in: ["PENDING", "CONFIRMED"] },
      bookingDate: { gte: new Date() },
    },
  });

  if (activeBookings > 0) {
    return NextResponse.json(
      { success: false, error: `Cannot delete table with ${activeBookings} active booking(s)` },
      { status: 400 }
    );
  }

  await prisma.shishaTable.delete({ where: { id } });

  return NextResponse.json({ success: true, message: "Table deleted" });
}
