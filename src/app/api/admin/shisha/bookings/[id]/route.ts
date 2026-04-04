import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const booking = await prisma.shishaBooking.findUnique({
    where: { id },
    include: { table: true },
  });

  if (!booking) {
    return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: booking });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};

  if (body.tableId) updateData.tableId = body.tableId;
  if (body.customerName) updateData.customerName = body.customerName;
  if (body.email) updateData.email = body.email;
  if (body.phone) updateData.phone = body.phone;
  if (body.bookingDate) updateData.bookingDate = new Date(body.bookingDate);
  if (body.bookingTime) {
    updateData.bookingTime = body.bookingTime;
    updateData.endTime = calculateEndTime(body.bookingTime);
  }
  if (body.guests !== undefined) updateData.guests = body.guests;
  if (body.status) updateData.status = body.status;
  if (body.notes !== undefined) updateData.notes = body.notes;

  const booking = await prisma.shishaBooking.update({
    where: { id },
    data: updateData,
    include: { table: true },
  });

  return NextResponse.json({ success: true, data: booking });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  await prisma.shishaBooking.delete({ where: { id } });

  return NextResponse.json({ success: true, message: "Booking deleted" });
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
