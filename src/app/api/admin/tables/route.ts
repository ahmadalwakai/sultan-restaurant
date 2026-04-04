import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

// Get all tables with their current booking status
export async function GET() {
  await requireAdmin();
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const tables = await prisma.restaurantTable.findMany({
    orderBy: { tableNumber: "asc" },
    include: {
      bookings: {
        where: {
          date: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
          status: {
            in: ["PENDING", "CONFIRMED"],
          },
        },
        orderBy: { time: "asc" },
      },
    },
  });

  // Calculate current availability based on time
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
  
  const tablesWithStatus = tables.map((table) => {
    // Find if table is currently occupied
    const currentBooking = table.bookings.find((booking) => {
      const bookingTime = booking.time;
      const endTime = booking.endTime || calculateEndTime(booking.time);
      return currentTime >= bookingTime && currentTime < endTime;
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

// Add new table
export async function POST(req: NextRequest) {
  await requireAdmin();
  
  const body = await req.json();
  
  // Get the next table number if not provided
  let tableNumber = body.tableNumber;
  if (!tableNumber) {
    const lastTable = await prisma.restaurantTable.findFirst({
      orderBy: { tableNumber: "desc" },
    });
    tableNumber = (lastTable?.tableNumber || 0) + 1;
  }

  // Check if table number already exists
  const existing = await prisma.restaurantTable.findUnique({
    where: { tableNumber },
  });
  
  if (existing) {
    return NextResponse.json(
      { success: false, error: `Table ${tableNumber} already exists` },
      { status: 400 }
    );
  }

  const table = await prisma.restaurantTable.create({
    data: {
      tableNumber,
      capacity: body.capacity || 4,
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json({ success: true, data: table }, { status: 201 });
}

// Helper function to calculate end time (booking time + 2:30)
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
