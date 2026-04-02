"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validators";
import { usePickupSlots } from "@/hooks/checkout";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  isLoading?: boolean;
}

export function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const { slots } = usePickupSlots();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register("customerName")}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            placeholder="Your name"
          />
          {errors.customerName && (
            <p className="mt-1 text-xs text-red-500">{errors.customerName.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
          <input
            {...register("customerPhone")}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            placeholder="07xxx xxx xxx"
          />
          {errors.customerPhone && (
            <p className="mt-1 text-xs text-red-500">{errors.customerPhone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register("customerEmail")}
          type="email"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="your@email.com"
        />
        {errors.customerEmail && (
          <p className="mt-1 text-xs text-red-500">{errors.customerEmail.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Pickup Time</label>
        <select
          {...register("pickupTime")}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        >
          <option value="">Select pickup time</option>
          {slots.map((slot) => (
            <option key={slot.time} value={slot.time}>
              {slot.label}
            </option>
          ))}
        </select>
        {errors.pickupTime && (
          <p className="mt-1 text-xs text-red-500">{errors.pickupTime.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Special Instructions (optional)
        </label>
        <textarea
          {...register("specialRequests")}
          rows={3}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="Any special requests?"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
}
