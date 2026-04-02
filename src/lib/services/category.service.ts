import { categoryRepository } from "@/lib/repositories";
import { toCategoryPublic, toCategoryAdmin } from "@/lib/mappers";
import { slugify } from "@/lib/utils";
import { NotFoundError, ConflictError } from "@/lib/errors";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/types/category";

export const categoryService = {
  async getPublicCategories() {
    const categories = await categoryRepository.findActive();
    return categories.map(toCategoryPublic);
  },

  async getAllCategories() {
    const categories = await categoryRepository.findAll();
    return categories.map(toCategoryAdmin);
  },

  async getBySlug(slug: string) {
    const category = await categoryRepository.findBySlug(slug);
    if (!category) throw new NotFoundError("Category");
    return toCategoryPublic(category);
  },

  async create(input: CreateCategoryInput) {
    const slug = slugify(input.name);
    const existing = await categoryRepository.findBySlug(slug);
    if (existing) throw new ConflictError("Category with this name already exists");
    const category = await categoryRepository.create({ ...input, slug });
    return toCategoryAdmin({ ...category, _count: { menuItems: 0 } });
  },

  async update(id: string, input: UpdateCategoryInput) {
    const existing = await categoryRepository.findById(id);
    if (!existing) throw new NotFoundError("Category");
    const data = input.name ? { ...input, slug: slugify(input.name) } : input;
    const updated = await categoryRepository.update(id, data);
    return toCategoryAdmin({ ...updated, _count: { menuItems: 0 } });
  },

  async delete(id: string) {
    const existing = await categoryRepository.findById(id);
    if (!existing) throw new NotFoundError("Category");
    await categoryRepository.delete(id);
  },

  async reorder(items: { id: string; sortOrder: number }[]) {
    await categoryRepository.reorder(items);
  },
};
