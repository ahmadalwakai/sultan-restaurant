import prisma from "@/lib/db";

export async function getSetting(key: string) {
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  return setting?.value ?? null;
}

export async function getSettingsByGroup(group: string) {
  const settings = await prisma.siteSetting.findMany({ where: { group } });
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}

export async function upsertSetting(key: string, value: string, group = "general") {
  return prisma.siteSetting.upsert({ where: { key }, create: { key, value, group }, update: { value } });
}

export async function upsertSettings(settings: Array<{ key: string; value: string }>, group = "general") {
  const ops = settings.map((s) => prisma.siteSetting.upsert({ where: { key: s.key }, create: { key: s.key, value: s.value, group }, update: { value: s.value } }));
  return prisma.$transaction(ops);
}
