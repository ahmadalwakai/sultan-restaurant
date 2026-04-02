import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const adminRepository = {
  findByEmail(email: string) {
    return prisma.admin.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.admin.findUnique({ where: { id } });
  },

  create(data: Prisma.AdminCreateInput) {
    return prisma.admin.create({ data });
  },

  updateLastLogin(id: string) {
    return prisma.admin.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  },
};
