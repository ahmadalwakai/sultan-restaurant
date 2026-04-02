import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const contactRepository = {
  findAll(params: {
    where?: Prisma.ContactMessageWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.ContactMessageOrderByWithRelationInput;
  }) {
    return prisma.contactMessage.findMany(params);
  },

  count(where?: Prisma.ContactMessageWhereInput) {
    return prisma.contactMessage.count({ where });
  },

  findById(id: string) {
    return prisma.contactMessage.findUnique({ where: { id } });
  },

  create(data: Prisma.ContactMessageCreateInput) {
    return prisma.contactMessage.create({ data });
  },

  update(id: string, data: Prisma.ContactMessageUpdateInput) {
    return prisma.contactMessage.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.contactMessage.delete({ where: { id } });
  },
};
