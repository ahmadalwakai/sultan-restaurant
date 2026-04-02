import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

function generateOrderNumber() {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function seedSampleOrders(prisma: PrismaClient) {
  if (process.env.NODE_ENV === "production") return [];

  seedLogger.info("Seeding sample orders (dev only)...");

  const menuItems = await prisma.menuItem.findMany({ take: 10 });
  if (menuItems.length === 0) {
    seedLogger.warn("No menu items found, skipping sample orders");
    return [];
  }

  const ordersData = [
    { customerName: "John Doe", status: "COMPLETED" as const, paymentStatus: "PAID" as const },
    { customerName: "Jane Smith", status: "READY" as const, paymentStatus: "PAID" as const },
    { customerName: "Ahmed Ali", status: "PREPARING" as const, paymentStatus: "PAID" as const },
    { customerName: "Sarah Jones", status: "CONFIRMED" as const, paymentStatus: "PAID" as const },
    { customerName: "Mike Brown", status: "PENDING" as const, paymentStatus: "PENDING" as const },
    { customerName: "Emma Wilson", status: "CANCELLED" as const, paymentStatus: "REFUNDED" as const },
    { customerName: "Omar Hassan", status: "COMPLETED" as const, paymentStatus: "PAID" as const },
    { customerName: "Lisa Chen", status: "COMPLETED" as const, paymentStatus: "PAID" as const },
  ];

  const orders = await Promise.all(
    ordersData.map(async (o) => {
      const items = menuItems.slice(0, Math.floor(Math.random() * 3) + 1);
      const subtotal = items.reduce((sum, item) => sum + Number(item.price) * 2, 0);

      return prisma.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          customerName: o.customerName,
          customerEmail: `${o.customerName.toLowerCase().replace(" ", ".")}@example.com`,
          customerPhone: "+44 7700 900000",
          status: o.status,
          paymentStatus: o.paymentStatus,
          paymentMethod: "STRIPE",
          type: "PICKUP",
          subtotal,
          discount: 0,
          total: subtotal,
          items: {
            create: items.map((item) => ({
              menuItemId: item.id,
              name: item.name,
              price: item.price,
              quantity: 2,
              subtotal: Number(item.price) * 2,
            })),
          },
        },
      });
    })
  );

  seedLogger.table("Order (sample)", orders.length);
  return orders;
}
