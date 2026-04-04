import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// Public route - Get available tables for a specific date/time
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const guests = parseInt(searchParams.get("guests") || "2");

  if (!date || !time) {
    return NextResponse.json(
      { success: false, error: "Date and time are required" },
      { status: 400 }
    );
  }

  const bookingDate = new Date(date);
  const requestedTime = time;
  const requestedEndTime = calculateEndTime(time);

  // Get all active tables that can accommodate the party size
  const allTables = await prisma.restaurantTable.findMany({
    where: {
      isActive: true,
      capacity: { gte: guests },
    },
    orderBy: { tableNumber: "asc" },
  });

  // Get bookings for that date that overlap with requested time
  const conflictingBookings = await prisma.booking.findMany({
    where: {
      date: bookingDate,
      status: { in: ["PENDING", "CONFIRMED"] },
      tableId: { not: null },
    },
    select: {
      tableId: true,
      time: true,
      endTime: true,
    },
  });

  // Find tables that are NOT booked during the requested time
  const availableTables = allTables.filter((table) => {
    const tableBookings = conflictingBookings.filter(
      (b) => b.tableId === table.id
    );

    // Check if any booking overlaps with requested time
    const hasConflict = tableBookings.some((booking) => {
      const bookingEndTime = booking.endTime || calculateEndTime(booking.time);
      // Overlap check: requested start < booking end AND requested end > booking start
      return requestedTime < bookingEndTime && requestedEndTime > booking.time;
    });

    return !hasConflict;
  });

  return NextResponse.json({
    success: true,
    data: {
      totalTables: allTables.length,
      availableTables: availableTables.length,
      tables: availableTables.map((t) => ({
        id: t.id,
        tableNumber: t.tableNumber,
        capacity: t.capacity,
      })),
      isAvailable: availableTables.length > 0,
    },
  });
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
