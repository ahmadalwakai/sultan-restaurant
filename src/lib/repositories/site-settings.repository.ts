import prisma from "@/lib/db/prisma";

export const siteSettingsRepository = {
  findAll(group?: string) {
    return prisma.siteSetting.findMany(
      group ? { where: { group } } : undefined
    );
  },

  findByKey(key: string) {
    return prisma.siteSetting.findUnique({ where: { key } });
  },

  async getValue(key: string): Promise<string | null> {
    const setting = await this.findByKey(key);
    return setting?.value ?? null;
  },

  upsert(key: string, value: string, group = "general") {
    return prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value, group },
    });
  },

  async upsertMany(settings: { key: string; value: string; group?: string }[]) {
    await prisma.$transaction(
      settings.map((s) =>
        prisma.siteSetting.upsert({
          where: { key: s.key },
          update: { value: s.value },
          create: { key: s.key, value: s.value, group: s.group || "general" },
        })
      )
    );
  },
};
