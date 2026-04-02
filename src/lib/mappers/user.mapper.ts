import type { User } from "@prisma/client";
import type { UserPublic, UserAdmin } from "@/types/user";

type UserWithCounts = User & { _count: { orders: number; bookings: number } };

export function toUserPublic(u: User): UserPublic {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    image: u.image,
    phone: u.phone,
    createdAt: u.createdAt.toISOString(),
  };
}

export function toUserAdmin(u: UserWithCounts): UserAdmin {
  return {
    ...toUserPublic(u),
    role: u.role,
    googleId: u.googleId,
    orderCount: u._count.orders,
    bookingCount: u._count.bookings,
    totalSpent: 0, // computed separately
    updatedAt: u.updatedAt.toISOString(),
  };
}
