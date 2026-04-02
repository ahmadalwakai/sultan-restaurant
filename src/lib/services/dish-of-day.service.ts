import { dishOfDayRepository } from "@/lib/repositories";
import { toDishOfDayPublic, toDishOfDayAdmin } from "@/lib/mappers";
import { NotFoundError } from "@/lib/errors";
import type { CreateDishOfDayInput, UpdateDishOfDayInput } from "@/types/dish-of-day";

export const dishOfDayService = {
  async getToday() {
    const dod = await dishOfDayRepository.findToday();
    if (!dod) return null;
    return toDishOfDayPublic(dod);
  },

  async getByDate(dateStr: string) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    const dod = await dishOfDayRepository.findByDate(date);
    if (!dod) return null;
    return toDishOfDayPublic(dod);
  },

  async getRecent(limit = 30) {
    const items = await dishOfDayRepository.findRecent(limit);
    return items.map(toDishOfDayAdmin);
  },

  async getById(id: string) {
    const dod = await dishOfDayRepository.findById(id);
    if (!dod) throw new NotFoundError("Dish of the Day");
    return toDishOfDayAdmin(dod);
  },

  async create(input: CreateDishOfDayInput) {
    const date = new Date(input.date);
    date.setHours(0, 0, 0, 0);

    const dod = await dishOfDayRepository.create({
      menuItem: { connect: { id: input.menuItemId } },
      discountPrice: input.discountPrice,
      reason: input.reason,
      date,
    });

    return toDishOfDayAdmin(dod);
  },

  async update(id: string, input: UpdateDishOfDayInput) {
    const existing = await dishOfDayRepository.findById(id);
    if (!existing) throw new NotFoundError("Dish of the Day");

    const updateData: Record<string, unknown> = {};
    if (input.menuItemId) updateData.menuItem = { connect: { id: input.menuItemId } };
    if (input.discountPrice !== undefined) updateData.discountPrice = input.discountPrice;
    if (input.reason !== undefined) updateData.reason = input.reason;
    if (input.date) {
      const date = new Date(input.date);
      date.setHours(0, 0, 0, 0);
      updateData.date = date;
    }

    const dod = await dishOfDayRepository.update(id, updateData);
    return toDishOfDayAdmin(dod);
  },

  async delete(id: string) {
    const existing = await dishOfDayRepository.findById(id);
    if (!existing) throw new NotFoundError("Dish of the Day");
    await dishOfDayRepository.delete(id);
  },
};
