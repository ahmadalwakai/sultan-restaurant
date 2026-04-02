import prisma from "@/lib/db";
import type { MessageStatus } from "@prisma/client";

export async function getMessages(params?: { status?: MessageStatus; page?: number; limit?: number }) {
  const { status, page = 1, limit = 20 } = params ?? {};
  const where = status ? { status } : {};
  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
    prisma.contactMessage.count({ where }),
  ]);
  return { messages, total, pages: Math.ceil(total / limit) };
}

export async function markMessageRead(id: string) {
  return prisma.contactMessage.update({ where: { id }, data: { status: "READ" } });
}

export async function deleteMessage(id: string) {
  return prisma.contactMessage.delete({ where: { id } });
}
