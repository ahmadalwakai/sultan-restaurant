"use client";

interface PickupInfoCardProps {
  pickupTime: string | null;
  orderType: "PICKUP" | "DELIVERY";
  address?: string;
}

export function PickupInfoCard({ pickupTime, orderType, address }: PickupInfoCardProps) {
  const isPickup = orderType === "PICKUP";

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-xl">
          {isPickup ? "🏪" : "🚗"}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{isPickup ? "Pickup" : "Delivery"}</p>
          <p className="font-semibold text-gray-900">
            {pickupTime
              ? new Date(pickupTime).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
              : "ASAP"}
          </p>
        </div>
      </div>
      {isPickup ? (
        <p className="mt-3 text-sm text-gray-500">
          📍 Sultan Restaurant, 577 Gallowgate, Glasgow G40 2PE
        </p>
      ) : (
        address && <p className="mt-3 text-sm text-gray-500">📍 {address}</p>
      )}
    </div>
  );
}
