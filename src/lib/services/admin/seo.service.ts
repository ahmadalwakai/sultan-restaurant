import prisma from "@/lib/db";

export async function getSeoSettings(pageSlug: string) {
  return prisma.seoSettings.findUnique({ where: { pageSlug } });
}

export async function upsertSeoSettings(data: { pageSlug: string; title?: string; description?: string; ogImage?: string; canonicalUrl?: string; noIndex?: boolean }) {
  return prisma.seoSettings.upsert({ where: { pageSlug: data.pageSlug }, create: data, update: data });
}

export async function getAllSeoSettings() {
  return prisma.seoSettings.findMany({ orderBy: { pageSlug: "asc" } });
}
