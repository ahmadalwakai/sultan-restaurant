"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/lib/validators";
import { useCreateBooking, useBookingAvailability } from "@/hooks/api";
import toast from "react-hot-toast";

interface BookingFormProps {
  onSuccess?: () => void;
}

export function BookingForm({ onSuccess }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const { data: availability } = useBookingAvailability(selectedDate);
  const createBooking = useCreateBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormValues) => {
    createBooking.mutate(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: data.guests,
        specialRequests: data.specialRequests,
      },
      {
        onSuccess: () => {
          toast.success("Table booked successfully!");
          reset();
          onSuccess?.();
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register("name")}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            placeholder="your@email.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
          <input
            {...register("phone")}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            placeholder="07xxx xxx xxx"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
          <input
            {...register("date")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              register("date").onChange(e);
            }}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Time</label>
          <select
            {...register("time")}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="">Select time</option>
            {availability?.availableSlots?.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Guests</label>
          <input
            {...register("guests", { valueAsNumber: true })}
            type="number"
            min={1}
            max={20}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          {errors.guests && <p className="mt-1 text-xs text-red-500">{errors.guests.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Special Requests (optional)
        </label>
        <textarea
          {...register("specialRequests")}
          rows={3}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          placeholder="Any dietary requirements or special requests?"
        />
      </div>

      <button
        type="submit"
        disabled={createBooking.isPending}
        className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
      >
        {createBooking.isPending ? "Booking..." : "Book Table"}
      </button>
    </form>
  );
}
