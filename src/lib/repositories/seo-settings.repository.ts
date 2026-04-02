import prisma from "@/lib/db/prisma";

export const seoSettingsRepository = {
  findAll() {
    return prisma.seoSettings.findMany();
  },

  findBySlug(pageSlug: string) {
    return prisma.seoSettings.findUnique({ where: { pageSlug } });
  },

  upsert(pageSlug: string, data: { title?: string; description?: string; ogImage?: string; canonicalUrl?: string; noIndex?: boolean }) {
    return prisma.seoSettings.upsert({
      where: { pageSlug },
      update: data,
      create: { pageSlug, ...data },
    });
  },
};
