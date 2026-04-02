import prisma from "@/lib/db";

export async function validateCartPrices(items: Array<{ menuItemId: string; quantity: number; expectedPrice?: number }>) {
  const menuItems = await prisma.menuItem.findMany({ where: { id: { in: items.map((i) => i.menuItemId) }, isAvailable: true } });

  const errors: string[] = [];
  for (const item of items) {
    const mi = menuItems.find((m) => m.id === item.menuItemId);
    if (!mi) { errors.push(`Item ${item.menuItemId} is not available`); continue; }
    if (item.expectedPrice !== undefined && Number(mi.price) !== item.expectedPrice) {
      errors.push(`Price for ${mi.name} has changed`);
    }
  }

  return { valid: errors.length === 0, errors, menuItems };
}
