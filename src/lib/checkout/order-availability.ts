import prisma from "@/lib/db/prisma";
import { BadRequestError } from "@/lib/errors";
import type { OrderType } from "@prisma/client";

export interface OrderAvailabilityStatus {
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  pickupPauseMessage: string | null;
  deliveryPauseMessage: string | null;
}

export async function getOrderAvailability(): Promise<OrderAvailabilityStatus> {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: ["pickupEnabled", "deliveryEnabled", "pickupPauseMessage", "deliveryPauseMessage"],
      },
    },
  });

  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return {
    pickupEnabled: settingsMap.pickupEnabled !== "false",
    deliveryEnabled: settingsMap.deliveryEnabled !== "false",
    pickupPauseMessage: settingsMap.pickupPauseMessage || null,
    deliveryPauseMessage: settingsMap.deliveryPauseMessage || null,
  };
}

export async function validateOrderType(type: OrderType): Promise<void> {
  const availability = await getOrderAvailability();

  if (type === "PICKUP" && !availability.pickupEnabled) {
    throw new BadRequestError(
      availability.pickupPauseMessage || "Pickup is temporarily unavailable. Please try again later."
    );
  }

  if (type === "DELIVERY" && !availability.deliveryEnabled) {
    throw new BadRequestError(
      availability.deliveryPauseMessage || "Delivery is temporarily unavailable. Please try again later."
    );
  }

  // TABLE orders are always allowed - they're in-restaurant
}
