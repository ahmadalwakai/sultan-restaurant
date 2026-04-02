import { menuRepository } from "@/lib/repositories";
import { toMenuItemPublic, toMenuItemAdmin } from "@/lib/mappers";
import { slugify } from "@/lib/utils";
import { NotFoundError } from "@/lib/errors";
import type { CreateMenuItemInput, UpdateMenuItemInput } from "@/types/menu";
import type { PaginationParams } from "@/types/common";

export const menuService = {
  async getMenuItems(params: PaginationParams & { categoryId?: string; search?: string }) {
    const where: Record<string, unknown> = { isAvailable: true };
    if (params.categoryId) where.categoryId = params.categoryId;
    if (params.search) where.name = { contains: params.search, mode: "insensitive" };

    const page = params.page || 1;
    const limit = params.limit || 12;
    const [items, total] = await Promise.all([
      menuRepository.findAll({ where, skip: (page - 1) * limit, take: limit, orderBy: { sortOrder: "asc" } }),
      menuRepository.count(where),
    ]);

    return {
      items: items.map(toMenuItemPublic),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  async getPopular(limit = 8) {
    const items = await menuRepository.findPopular(limit);
    return items.map(toMenuItemPublic);
  },

  async getByCategory(categorySlug: string) {
    const items = await menuRepository.findAll({
      where: { category: { slug: categorySlug }, isAvailable: true },
      orderBy: { sortOrder: "asc" },
    });
    return items.map(toMenuItemPublic);
  },

  async getById(id: string) {
    const item = await menuRepository.findById(id);
    if (!item) throw new NotFoundError("Menu item");
    return toMenuItemPublic(item);
  },

  async create(input: CreateMenuItemInput) {
    const slug = slugify(input.name);
    const item = await menuRepository.create({
      ...input,
      slug,
      price: input.price,
      category: { connect: { id: input.categoryId } },
    } as never);
    return toMenuItemAdmin(item);
  },

  async update(id: string, input: UpdateMenuItemInput) {
    const existing = await menuRepository.findById(id);
    if (!existing) throw new NotFoundError("Menu item");
    const data: Record<string, unknown> = { ...input };
    if (input.name) data.slug = slugify(input.name);
    if (input.categoryId) {
      data.category = { connect: { id: input.categoryId } };
      delete data.categoryId;
    }
    const updated = await menuRepository.update(id, data);
    return toMenuItemAdmin(updated);
  },

  async delete(id: string) {
    const existing = await menuRepository.findById(id);
    if (!existing) throw new NotFoundError("Menu item");
    await menuRepository.delete(id);
  },

  async reorder(items: { id: string; sortOrder: number }[]) {
    await menuRepository.reorder(items);
  },
};
