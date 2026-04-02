"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuAdminSchema, type MenuAdminFormValues } from "@/lib/validators";
import { useAdminCategories } from "@/hooks/admin";

interface MenuItemFormProps {
  defaultValues?: Partial<MenuAdminFormValues>;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function MenuItemForm({ defaultValues, onSubmit, isLoading }: MenuItemFormProps) {
  const { data: categories } = useAdminCategories();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuAdminFormValues>({
    resolver: zodResolver(menuAdminSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: MenuAdminFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("categoryId", data.categoryId);
    if (data.description) formData.append("description", data.description);
    if (data.spiceLevel) formData.append("spiceLevel", String(data.spiceLevel));
    if (data.isVegetarian) formData.append("isVegetarian", "true");
    if (data.isVegan) formData.append("isVegan", "true");
    if (data.isGlutenFree) formData.append("isGlutenFree", "true");
    if (data.isPopular) formData.append("isPopular", "true");
    if (imageFile) formData.append("image", imageFile);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Item Name</label>
          <input
            {...register("name")}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Price (£)</label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
        <select
          {...register("categoryId")}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        >
          <option value="">Select category</option>
          {(categories as { id: string; name: string }[] | undefined)?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="mt-1 text-xs text-red-500">{errors.categoryId.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Spice Level (0-5)</label>
          <input
            {...register("spiceLevel", { valueAsNumber: true })}
            type="number"
            min={0}
            max={5}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input {...register("isVegetarian")} type="checkbox" className="rounded" />
          Vegetarian
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input {...register("isVegan")} type="checkbox" className="rounded" />
          Vegan
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input {...register("isGlutenFree")} type="checkbox" className="rounded" />
          Gluten Free
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input {...register("isPopular")} type="checkbox" className="rounded" />
          Popular
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-amber-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : defaultValues ? "Update Item" : "Create Item"}
      </button>
    </form>
  );
}
