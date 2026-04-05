import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import prisma from "@/lib/db/prisma";

export async function GET() {
  try {
    await requireAdmin();

    const settings = await prisma.siteSetting.findMany({
      where: { group: "ordering" },
    });

    const mapped = Object.fromEntries(settings.map((s) => [s.key, s.value]));

    return NextResponse.json({ success: true, data: mapped });
  } catch (error) {
    console.error("Error fetching ordering settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch ordering settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { pickupEnabled, deliveryEnabled, pickupPauseMessage, deliveryPauseMessage } = body;

    const updates = [
      { key: "pickupEnabled", value: String(pickupEnabled ?? true), group: "ordering" },
      { key: "deliveryEnabled", value: String(deliveryEnabled ?? true), group: "ordering" },
      { key: "pickupPauseMessage", value: pickupPauseMessage || "Pickup is temporarily unavailable. Please try again later.", group: "ordering" },
      { key: "deliveryPauseMessage", value: deliveryPauseMessage || "Delivery is temporarily unavailable. Please try again later.", group: "ordering" },
    ];

    await Promise.all(
      updates.map((setting) =>
        prisma.siteSetting.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: setting,
        })
      )
    );

    return NextResponse.json({ success: true, message: "Ordering settings updated" });
  } catch (error) {
    console.error("Error updating ordering settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update ordering settings" },
      { status: 500 }
    );
  }
}
