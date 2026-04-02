export * from "./checkout.service";
export * from "./validate-checkout";
export * from "./pickup-slot.service";
export * from "./order-pipeline";

// Alias for API compatibility
import { processCheckout } from "./checkout.service";
export const checkoutService = {
  process: processCheckout,
};
