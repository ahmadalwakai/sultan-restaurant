import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

// Get all shisha tables with current booking status
export async function GET() {
  await requireAdmin();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const tables = await prisma.shishaTable.findMany({
    orderBy: { tableNumber: "asc" },
    include: {
      bookings: {
        where: {
          bookingDate: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
          status: { in: ["PENDING", "CONFIRMED"] },
        },
        orderBy: { bookingTime: "asc" },
      },
    },
  });

  const currentTime = now.toTimeString().slice(0, 5);

  const tablesWithStatus = tables.map((table) => {
    const currentBooking = table.bookings.find((booking) => {
      const endTime = booking.endTime || calculateEndTime(booking.bookingTime);
      return currentTime >= booking.bookingTime && currentTime < endTime;
    });

    return {
      ...table,
      isCurrentlyOccupied: !!currentBooking,
      currentBooking: currentBooking || null,
      todayBookings: table.bookings,
    };
  });

  return NextResponse.json({ success: true, data: tablesWithStatus });
}

// Add new shisha table
export async function POST(req: NextRequest) {
  await requireAdmin();

  const body = await req.json();

  let tableNumber = body.tableNumber;
  if (!tableNumber) {
    const lastTable = await prisma.shishaTable.findFirst({
      orderBy: { tableNumber: "desc" },
    });
    tableNumber = (lastTable?.tableNumber || 0) + 1;
  }

  const existing = await prisma.shishaTable.findUnique({
    where: { tableNumber },
  });

  if (existing) {
    return NextResponse.json(
      { success: false, error: `Shisha Table ${tableNumber} already exists` },
      { status: 400 }
    );
  }

  const table = await prisma.shishaTable.create({
    data: {
      tableNumber,
      name: body.name || `Table ${tableNumber}`,
      capacity: body.capacity || 4,
      status: body.status || "AVAILABLE",
      isActive: body.isActive ?? true,
      notes: body.notes,
    },
  });

  return NextResponse.json({ success: true, data: table }, { status: 201 });
}

function calculateEndTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  let endHours = hours + 2;
  let endMinutes = minutes + 30;

  if (endMinutes >= 60) {
    endHours += 1;
    endMinutes -= 60;
  }

  if (endHours >= 24) {
    endHours = 23;
    endMinutes = 59;
  }

  return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}
