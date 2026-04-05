import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import prisma from "@/lib/db/prisma";
import type { AdminNotification, NotificationType } from "@/types/notification";

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5);
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const sinceParam = searchParams.get("since");
    const since = sinceParam ? new Date(sinceParam) : new Date(Date.now() - 24 * 60 * 60 * 1000); // Default: last 24 hours

    // Fetch bookings (TABLE and WEDDING)
    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: { gt: since },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    // Fetch orders
    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gt: since },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    // Fetch shisha bookings
    const shishaBookings = await prisma.shishaBooking.findMany({
      where: {
        createdAt: { gt: since },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const notifications: AdminNotification[] = [];

    // Map Bookings to notifications
    for (const booking of bookings) {
      const type: NotificationType = booking.bookingType === "WEDDING" ? "WEDDING_BOOKING" : "TABLE_BOOKING";
      const title = type === "WEDDING_BOOKING" ? "New Wedding Booking" : "New Table Booking";
      
      notifications.push({
        id: booking.id,
        type,
        title,
        message: `${booking.name} booked for ${booking.guests} guests`,
        customerName: booking.name,
        customerPhone: booking.phone,
        date: formatDate(booking.date),
        time: booking.time,
        guests: booking.guests,
        status: booking.status,
        createdAt: booking.createdAt.toISOString(),
        read: false,
      });
    }

    // Map Orders to notifications
    for (const order of orders) {
      notifications.push({
        id: order.id,
        type: "ORDER",
        title: "New Order",
        message: `Order #${order.orderNumber} from ${order.customerName}`,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        date: formatDate(order.createdAt),
        time: formatTime(order.createdAt),
        orderNumber: order.orderNumber,
        total: Number(order.total),
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        read: false,
      });
    }

    // Map ShishaBookings to notifications
    for (const shisha of shishaBookings) {
      notifications.push({
        id: shisha.id,
        type: "SHISHA_BOOKING",
        title: "New Shisha Booking",
        message: `${shisha.customerName} booked for ${shisha.guests} guests`,
        customerName: shisha.customerName,
        customerPhone: shisha.phone,
        date: formatDate(shisha.bookingDate),
        time: shisha.bookingTime,
        guests: shisha.guests,
        status: shisha.status,
        createdAt: shisha.createdAt.toISOString(),
        read: false,
      });
    }

    // Sort all notifications by createdAt DESC
    notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      data: notifications,
      total: notifications.length,
    });
  } catch (error) {
    console.error("Error fetching admin notifications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch notifications", data: [], total: 0 },
      { status: 500 }
    );
  }
}
