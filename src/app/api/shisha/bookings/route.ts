import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  bookingDate: z.string(),
  bookingTime: z.string(),
  guests: z.number().min(1).max(20),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bookingSchema.parse(body);

    const bookingDate = new Date(data.bookingDate);
    const requestedTime = data.bookingTime;
    const requestedEndTime = calculateEndTime(requestedTime);

    // Find an available table
    const allTables = await prisma.shishaTable.findMany({
      where: {
        isActive: true,
        status: { not: "TEMPORARILY_UNAVAILABLE" },
        capacity: { gte: data.guests },
      },
      orderBy: [{ capacity: "asc" }, { tableNumber: "asc" }],
    });

    const existingBookings = await prisma.shishaBooking.findMany({
      where: {
        bookingDate: bookingDate,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
      select: { tableId: true, bookingTime: true, endTime: true },
    });

    let selectedTable = null;

    for (const table of allTables) {
      const tableBookings = existingBookings.filter((b) => b.tableId === table.id);

      const hasConflict = tableBookings.some((booking) => {
        const bookingEndTime = booking.endTime || calculateEndTime(booking.bookingTime);
        return requestedTime < bookingEndTime && requestedEndTime > booking.bookingTime;
      });

      if (!hasConflict) {
        selectedTable = table;
        break;
      }
    }

    if (!selectedTable) {
      return NextResponse.json(
        { success: false, error: "No tables available for this time slot. Please try a different time." },
        { status: 400 }
      );
    }

    const booking = await prisma.shishaBooking.create({
      data: {
        tableId: selectedTable.id,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        bookingDate: bookingDate,
        bookingTime: requestedTime,
        endTime: requestedEndTime,
        guests: data.guests,
        notes: data.notes,
        status: "PENDING",
      },
      include: { table: true },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: booking.id,
        tableNumber: booking.table.tableNumber,
        tableName: booking.table.name,
        date: booking.bookingDate,
        time: booking.bookingTime,
        endTime: booking.endTime,
        guests: booking.guests,
        status: booking.status,
      },
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || "Invalid booking data" },
        { status: 400 }
      );
    }
    console.error("Shisha booking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
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
