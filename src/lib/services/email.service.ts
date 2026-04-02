import prisma from "@/lib/db";
import type { EmailStatus } from "@prisma/client";

export async function logEmail(data: { to: string; subject: string; template: string; status?: EmailStatus; resendId?: string; error?: string }) {
  return prisma.emailLog.create({ data: { ...data, status: data.status ?? "SENT" } });
}

export async function getEmailLogs(params?: { page?: number; limit?: number; template?: string }) {
  const { page = 1, limit = 20, template } = params ?? {};
  const where = template ? { template } : {};
  const [logs, total] = await Promise.all([
    prisma.emailLog.findMany({ where, orderBy: { sentAt: "desc" }, skip: (page - 1) * limit, take: limit }),
    prisma.emailLog.count({ where }),
  ]);
  return { logs, total, pages: Math.ceil(total / limit) };
}

export async function getEmailLogById(id: string) {
  return prisma.emailLog.findUnique({ where: { id } });
}
