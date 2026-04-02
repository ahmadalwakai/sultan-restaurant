import prisma from "@/lib/db";

const SLOT_DURATION = 15; // minutes
const MAX_ORDERS_PER_SLOT = 5;

export function generateTimeSlots(openTime = "11:00", closeTime = "21:30") {
  const slots: string[] = [];
  const [openH, openM] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);
  let h = openH, m = openM;

  while (h < closeH || (h === closeH && m <= closeM)) {
    slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    m += SLOT_DURATION;
    if (m >= 60) { h++; m -= 60; }
  }
  return slots;
}

export async function getAvailableSlots(date: string) {
  const dayStart = new Date(date);
  const dayEnd = new Date(dayStart.getTime() + 86400000);

  const orders = await prisma.order.findMany({
    where: { pickupTime: { gte: dayStart, lt: dayEnd }, status: { notIn: ["CANCELLED", "REFUNDED"] } },
    select: { pickupTime: true },
  });

  const allSlots = generateTimeSlots();
  const slotCounts = new Map<string, number>();
  for (const order of orders) {
    if (order.pickupTime) {
      const t = `${order.pickupTime.getHours().toString().padStart(2, "0")}:${order.pickupTime.getMinutes().toString().padStart(2, "0")}`;
      slotCounts.set(t, (slotCounts.get(t) ?? 0) + 1);
    }
  }

  return allSlots.map((slot) => ({ time: slot, available: (slotCounts.get(slot) ?? 0) < MAX_ORDERS_PER_SLOT }));
}
