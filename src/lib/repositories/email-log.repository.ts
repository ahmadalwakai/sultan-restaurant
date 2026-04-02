import prisma from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

export const emailLogRepository = {
  findAll(params: {
    where?: Prisma.EmailLogWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.EmailLogOrderByWithRelationInput;
  }) {
    return prisma.emailLog.findMany(params);
  },

  count(where?: Prisma.EmailLogWhereInput) {
    return prisma.emailLog.count({ where });
  },

  findById(id: string) {
    return prisma.emailLog.findUnique({ where: { id } });
  },

  create(data: Prisma.EmailLogCreateInput) {
    return prisma.emailLog.create({ data });
  },
};
