import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  await requireAdmin();
  const from = req.nextUrl.searchParams.get("from");
  const to = req.nextUrl.searchParams.get("to");

  const where = {
    ...(from && to && {
      date: { gte: new Date(from), lte: new Date(to) },
    }),
  };

  const bookings = await prisma.booking.findMany({
    where,
    include: { user: { select: { name: true, email: true } } },
    orderBy: { date: "desc" },
  });

  const header = "Name,Email,Date,Time,Guests,Status,Special Requests\n";
  const rows = bookings.map((b) =>
    `${b.name},${b.email},${b.date.toISOString().split("T")[0]},${b.time},${b.guests},${b.status},"${b.specialRequests ?? ""}"`
  );

  return new NextResponse(header + rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="bookings-${Date.now()}.csv"`,
    },
  });
}
