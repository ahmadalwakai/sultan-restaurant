import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { sendBookingReminder } from "@/lib/email/senders";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(dayAfter.getDate() + 1);

  const bookings = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
      date: { gte: tomorrow, lt: dayAfter },
    },
  });

  let sent = 0;
  for (const booking of bookings) {
    try {
      await sendBookingReminder({
        name: booking.name,
        email: booking.email,
        date: booking.date.toISOString().split("T")[0],
        time: booking.time,
        guests: booking.guests,
        specialRequests: booking.specialRequests ?? undefined,
      });
      sent++;
    } catch {
      console.error(`Failed to send reminder for booking ${booking.id}`);
    }
  }

  return NextResponse.json({ success: true, processed: sent });
}
