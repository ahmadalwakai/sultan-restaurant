import type { SiteSetting, OpeningHours } from "@prisma/client";
import type { SiteSettingsMap, OpeningHoursEntry } from "@/types/site-settings";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function toSiteSettingsMap(settings: SiteSetting[]): SiteSettingsMap {
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}

export function toOpeningHoursEntry(h: OpeningHours): OpeningHoursEntry {
  return {
    dayOfWeek: h.dayOfWeek,
    dayName: DAY_NAMES[h.dayOfWeek],
    openTime: h.openTime,
    closeTime: h.closeTime,
    isClosed: h.isClosed,
  };
}
