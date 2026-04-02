import type { Prisma } from "@prisma/client";
import { testDb } from "./test-db";
import { categories, menuItems, users, bookings, orders } from "../../fixtures";

export async function seedTestData() {
  // Create test users
  for (const user of users) {
    await testDb.user.create({ data: user as unknown as Prisma.UserCreateInput });
  }

  // Create test categories
  for (const category of categories) {
    await testDb.category.create({ data: category });
  }

  // Create test menu items
  for (const item of menuItems) {
    await testDb.menuItem.create({ data: item as unknown as Prisma.MenuItemCreateInput });
  }

  // Create test bookings
  for (const booking of bookings) {
    await testDb.booking.create({ data: booking as unknown as Prisma.BookingCreateInput });
  }

  // Create test orders with items
  for (const order of orders) {
    const { items, ...orderData } = order;
    await testDb.order.create({
      data: {
        ...(orderData as unknown as Prisma.OrderCreateInput),
        items: { create: items },
      },
    });
  }
}
