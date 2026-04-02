"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryAdminSchema, type CategoryAdminFormValues } from "@/lib/validators";

interface CategoryFormProps {
  defaultValues?: Partial<CategoryAdminFormValues>;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function CategoryForm({ defaultValues, onSubmit, isLoading }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryAdminFormValues>({
    resolver: zodResolver(categoryAdminSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: CategoryAdminFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Category Name</label>
        <input
          {...register("name")}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="e.g. Starters, Main Course"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description (optional)</label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="Describe this category"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-amber-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : defaultValues ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
}
