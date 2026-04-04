import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  await requireAdmin();

  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get("status");
  const date = searchParams.get("date");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: Record<string, unknown> = {};

  if (status) {
    where.status = status;
  }

  if (date) {
    const bookingDate = new Date(date);
    where.bookingDate = {
      gte: bookingDate,
      lt: new Date(bookingDate.getTime() + 24 * 60 * 60 * 1000),
    };
  }

  const [bookings, total] = await Promise.all([
    prisma.shishaBooking.findMany({
      where,
      include: { table: true },
      orderBy: [{ bookingDate: "desc" }, { bookingTime: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.shishaBooking.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: bookings,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(req: NextRequest) {
  await requireAdmin();

  const body = await req.json();

  const endTime = calculateEndTime(body.bookingTime);

  const booking = await prisma.shishaBooking.create({
    data: {
      tableId: body.tableId,
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      bookingDate: new Date(body.bookingDate),
      bookingTime: body.bookingTime,
      endTime,
      guests: body.guests,
      status: body.status || "CONFIRMED",
      notes: body.notes,
    },
    include: { table: true },
  });

  return NextResponse.json({ success: true, data: booking }, { status: 201 });
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
