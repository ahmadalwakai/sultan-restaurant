import { siteSettingsRepository } from "@/lib/repositories";
import { openingHoursRepository } from "@/lib/repositories";
import { toSiteSettingsMap, toOpeningHoursEntry } from "@/lib/mappers";

export const siteSettingsService = {
  async getSettings(group?: string) {
    const settings = await siteSettingsRepository.findAll(group);
    return toSiteSettingsMap(settings);
  },

  async getSetting(key: string) {
    return siteSettingsRepository.getValue(key);
  },

  async updateSettings(settings: { key: string; value: string; group?: string }[]) {
    await siteSettingsRepository.upsertMany(settings);
  },

  async getOpeningHours() {
    const hours = await openingHoursRepository.findAll();
    return hours.map(toOpeningHoursEntry);
  },

  async updateOpeningHours(hours: { dayOfWeek: number; openTime: string; closeTime: string; isClosed: boolean }[]) {
    await openingHoursRepository.upsertAll(hours);
  },
};
