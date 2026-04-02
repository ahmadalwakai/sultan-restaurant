import prisma from "@/lib/db";

export async function validateCartItems(items: Array<{ menuItemId: string; quantity: number }>) {
  const menuItemIds = items.map((i) => i.menuItemId);
  const menuItems = await prisma.menuItem.findMany({ where: { id: { in: menuItemIds }, isAvailable: true } });

  const validItems = items.filter((item) => menuItems.some((mi) => mi.id === item.menuItemId));
  const invalidIds = items.filter((item) => !menuItems.some((mi) => mi.id === item.menuItemId)).map((i) => i.menuItemId);

  const itemsWithPrices = validItems.map((item) => {
    const mi = menuItems.find((m) => m.id === item.menuItemId)!;
    return { ...item, name: mi.name, price: Number(mi.price), subtotal: Number(mi.price) * item.quantity };
  });

  const subtotal = itemsWithPrices.reduce((sum, i) => sum + i.subtotal, 0);
  return { items: itemsWithPrices, invalidIds, subtotal };
}
