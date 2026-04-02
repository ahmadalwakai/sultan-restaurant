import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const settingsData = [
  { key: "restaurantName", value: "Sultan Restaurant", group: "general" },
  { key: "tagline", value: "Authentic Middle Eastern & Indian Cuisine", group: "general" },
  { key: "phone", value: "+44 141 391 8883", group: "contact" },
  { key: "email", value: "info@sultanrestaurant.co.uk", group: "contact" },
  { key: "address", value: "577 Gallowgate, Glasgow G40 2PE", group: "contact" },
  { key: "postcode", value: "G40 2PE", group: "contact" },
  { key: "city", value: "Glasgow", group: "contact" },
  { key: "mapUrl", value: "https://maps.google.com/?q=Sultan+Restaurant+577+Gallowgate+Glasgow", group: "contact" },
  { key: "orderMinimum", value: "15.00", group: "ordering" },
  { key: "pickupLeadTime", value: "30", group: "ordering" },
  { key: "maxFutureBookingDays", value: "30", group: "booking" },
  { key: "maxGuestsPerBooking", value: "12", group: "booking" },
  { key: "bookingSlotDuration", value: "120", group: "booking" },
  { key: "currency", value: "GBP", group: "general" },
  { key: "locale", value: "en-GB", group: "general" },
  { key: "timezone", value: "Europe/London", group: "general" },
  { key: "showOffers", value: "true", group: "homepage" },
  { key: "showReviews", value: "true", group: "homepage" },
  { key: "showGallery", value: "true", group: "homepage" },
  { key: "showBooking", value: "true", group: "homepage" },
  { key: "showDeliveryPartners", value: "true", group: "homepage" },
];

export async function seedSiteSettings(prisma: PrismaClient) {
  seedLogger.info("Seeding site settings...");

  const settings = await Promise.all(
    settingsData.map((s) =>
      prisma.siteSetting.upsert({
        where: { key: s.key },
        update: { value: s.value, group: s.group },
        create: s,
      })
    )
  );

  seedLogger.table("SiteSetting", settings.length);
  return settings;
}
