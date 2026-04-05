import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export interface OrderAvailability {
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  pickupPauseMessage: string | null;
  deliveryPauseMessage: string | null;
}

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: ["pickupEnabled", "deliveryEnabled", "pickupPauseMessage", "deliveryPauseMessage"],
        },
      },
    });

    const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

    const availability: OrderAvailability = {
      pickupEnabled: settingsMap.pickupEnabled !== "false",
      deliveryEnabled: settingsMap.deliveryEnabled !== "false",
      pickupPauseMessage: settingsMap.pickupPauseMessage || null,
      deliveryPauseMessage: settingsMap.deliveryPauseMessage || null,
    };

    return NextResponse.json({ success: true, data: availability });
  } catch (error) {
    console.error("Error fetching order availability:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order availability" },
      { status: 500 }
    );
  }
}
