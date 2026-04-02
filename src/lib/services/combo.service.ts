import { comboRepository } from "@/lib/repositories";
import { toComboPublic, toComboAdmin } from "@/lib/mappers";
import { NotFoundError } from "@/lib/errors";
import { slugify } from "@/lib/utils/slugify";
import type { CreateComboInput, UpdateComboInput } from "@/types/combo";

export const comboService = {
  async getActiveCombos() {
    const combos = await comboRepository.findActive();
    return combos.map(toComboPublic);
  },

  async getById(id: string) {
    const combo = await comboRepository.findById(id);
    if (!combo) throw new NotFoundError("Combo");
    return toComboAdmin(combo);
  },

  async getAll() {
    const combos = await comboRepository.findAll({
      orderBy: { sortOrder: "asc" },
    });
    return combos.map(toComboAdmin);
  },

  async create(input: CreateComboInput) {
    const { items, ...data } = input;

    // Calculate original price from individual items
    const menuItems = await Promise.all(
      items.map(async (i) => {
        const { menuRepository } = await import("@/lib/repositories");
        const mi = await menuRepository.findById(i.menuItemId);
        return { price: mi ? Number(mi.price) : 0, quantity: i.quantity };
      })
    );
    const originalPrice = menuItems.reduce((sum, m) => sum + m.price * m.quantity, 0);
    const savings = Math.max(0, originalPrice - input.price);

    const combo = await comboRepository.create({
      ...data,
      slug: slugify(data.name),
      originalPrice,
      savings,
      items: { create: items },
    });

    return toComboAdmin(combo);
  },

  async update(id: string, input: UpdateComboInput) {
    const existing = await comboRepository.findById(id);
    if (!existing) throw new NotFoundError("Combo");

    const { items, ...data } = input;
    const updateData: Record<string, unknown> = { ...data };

    if (data.name) updateData.slug = slugify(data.name);

    if (items) {
      await comboRepository.replaceItems(id, items);

      const menuItems = await Promise.all(
        items.map(async (i) => {
          const { menuRepository } = await import("@/lib/repositories");
          const mi = await menuRepository.findById(i.menuItemId);
          return { price: mi ? Number(mi.price) : 0, quantity: i.quantity };
        })
      );
      const originalPrice = menuItems.reduce((sum, m) => sum + m.price * m.quantity, 0);
      const price = input.price ?? Number(existing.price);
      updateData.originalPrice = originalPrice;
      updateData.savings = Math.max(0, originalPrice - price);
    }

    const combo = await comboRepository.update(id, updateData);
    return toComboAdmin(combo);
  },

  async delete(id: string) {
    const existing = await comboRepository.findById(id);
    if (!existing) throw new NotFoundError("Combo");
    await comboRepository.delete(id);
  },
};
