"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { offerAdminSchema, type OfferAdminFormValues } from "@/lib/validators";

interface OfferFormProps {
  defaultValues?: Partial<OfferAdminFormValues>;
  onSubmit: (data: OfferAdminFormValues) => void;
  isLoading?: boolean;
}

export function OfferForm({ defaultValues, onSubmit, isLoading }: OfferFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OfferAdminFormValues>({
    resolver: zodResolver(offerAdminSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
        <input
          {...register("title")}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Discount Type</label>
          <select
            {...register("discountType")}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="FIXED">Fixed Amount</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Discount Value</label>
          <input
            {...register("discount", { valueAsNumber: true })}
            type="number"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          {errors.discount && (
            <p className="mt-1 text-xs text-red-500">{errors.discount.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Valid From</label>
          <input
            {...register("validFrom")}
            type="date"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Valid Until</label>
          <input
            {...register("validUntil")}
            type="date"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-amber-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : defaultValues ? "Update Offer" : "Create Offer"}
      </button>
    </form>
  );
}
