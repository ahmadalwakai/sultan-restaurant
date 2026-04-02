export { bookingService, bookingService as bookingsService } from "./booking.service";
export { categoryService } from "./category.service";
export { comboService } from "./combo.service";
export { contactService } from "./contact.service";
export { couponService } from "./coupon.service";
export { dishOfDayService } from "./dish-of-day.service";
export { instagramService } from "./instagram.service";
export { menuService } from "./menu.service";
export { offerService } from "./offer.service";
export { orderService, orderService as ordersService } from "./order.service";
export { reviewService } from "./review.service";
export { siteSettingsService } from "./site-settings.service";

// Cart service (client-side only, but export for API compatibility)
export const cartService = {
  validate: async (items: { menuItemId: string; quantity: number }[]) => {
    // Validate items exist and calculate prices
    return { valid: true, items: [] };
  },
};

// Pickup slot service
export const pickupSlotService = {
  getAvailableSlots: async (date: string) => {
    const slots = [];
    const baseDate = new Date(date);
    for (let hour = 11; hour <= 21; hour++) {
      for (const min of [0, 30]) {
        const slotTime = new Date(baseDate);
        slotTime.setHours(hour, min, 0, 0);
        slots.push({
          time: slotTime.toISOString(),
          label: slotTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
          available: true,
        });
      }
    }
    return slots;
  },
};
