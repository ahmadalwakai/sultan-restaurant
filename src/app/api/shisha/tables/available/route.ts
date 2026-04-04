import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// Public: Check shisha table availability
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

  // Get all active tables that can accommodate the party
  const allTables = await prisma.shishaTable.findMany({
    where: {
      isActive: true,
      status: { not: "TEMPORARILY_UNAVAILABLE" },
      capacity: { gte: guests },
    },
    orderBy: { tableNumber: "asc" },
  });

  // Get bookings for that date that might conflict
  const existingBookings = await prisma.shishaBooking.findMany({
    where: {
      bookingDate: bookingDate,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    select: {
      tableId: true,
      bookingTime: true,
      endTime: true,
    },
  });

  // Find tables that are not booked during requested time
  const availableTables = allTables.filter((table) => {
    const tableBookings = existingBookings.filter((b) => b.tableId === table.id);

    const hasConflict = tableBookings.some((booking) => {
      const bookingEndTime = booking.endTime || calculateEndTime(booking.bookingTime);
      return requestedTime < bookingEndTime && requestedEndTime > booking.bookingTime;
    });

    return !hasConflict;
  });

  // Get total active tables count for display
  const totalActiveTables = await prisma.shishaTable.count({
    where: { isActive: true, status: { not: "TEMPORARILY_UNAVAILABLE" } },
  });

  return NextResponse.json({
    success: true,
    data: {
      totalTables: totalActiveTables,
      availableTables: availableTables.length,
      tables: availableTables.map((t) => ({
        id: t.id,
        tableNumber: t.tableNumber,
        name: t.name,
        capacity: t.capacity,
      })),
      isAvailable: availableTables.length > 0,
    },
  });
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
