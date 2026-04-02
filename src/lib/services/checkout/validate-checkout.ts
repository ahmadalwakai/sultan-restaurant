import { createOrderSchema } from "@/lib/validations/order";
import { validateCartItems } from "@/lib/services/cart.service";

export async function validateCheckout(data: unknown) {
  const parsed = createOrderSchema.safeParse(data);
  if (!parsed.success) {
    return { valid: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { invalidIds } = await validateCartItems(parsed.data.items);
  if (invalidIds.length > 0) {
    return { valid: false, errors: { items: [`Unavailable items: ${invalidIds.join(", ")}`] } };
  }

  return { valid: true, data: parsed.data };
}
