"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/lib/validators";
import { useCreateBooking, useBookingAvailability } from "@/hooks/api";
import toast from "react-hot-toast";
import { brandColors, brandRadii, brandTypography } from "@/theme/branding";
import { brandGradients } from "@/lib/design";

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: brandRadii.lg,
  border: `1px solid ${brandColors.gold[200]}`,
  padding: "0.625rem 0.875rem",
  fontSize: brandTypography.sizes.small,
  fontFamily: brandTypography.fonts.body,
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  background: "#FFFFFF",
  color: brandColors.charcoal,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.375rem",
  fontSize: brandTypography.sizes.small,
  fontWeight: brandTypography.weights.medium,
  color: "#374151",
  fontFamily: brandTypography.fonts.body,
};

const errorStyle: React.CSSProperties = {
  marginTop: "0.25rem",
  fontSize: brandTypography.sizes.xs,
  color: brandColors.accent[500],
};

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
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Name */}
      <div>
        <label style={labelStyle}>Name</label>
        <input
          {...register("name")}
          style={inputStyle}
          placeholder="Your full name"
          className="booking-input"
        />
        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
      </div>

      {/* Email + Phone */}
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }} className="booking-grid-2">
        <div>
          <label style={labelStyle}>Email</label>
          <input
            {...register("email")}
            type="email"
            style={inputStyle}
            placeholder="your@email.com"
            className="booking-input"
          />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            {...register("phone")}
            style={inputStyle}
            placeholder="07xxx xxx xxx"
            className="booking-input"
          />
          {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Date + Time + Guests */}
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr 1fr" }} className="booking-grid-3">
        <div>
          <label style={labelStyle}>Date</label>
          <input
            {...register("date")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              register("date").onChange(e);
            }}
            style={inputStyle}
            className="booking-input"
          />
          {errors.date && <p style={errorStyle}>{errors.date.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Time</label>
          <select
            {...register("time")}
            style={{ ...inputStyle, appearance: "auto" as React.CSSProperties["appearance"] }}
            className="booking-input"
          >
            <option value="">Select time</option>
            {availability?.availableSlots?.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && <p style={errorStyle}>{errors.time.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Guests</label>
          <input
            {...register("guests", { valueAsNumber: true })}
            type="number"
            min={1}
            max={20}
            style={inputStyle}
            className="booking-input"
          />
          {errors.guests && <p style={errorStyle}>{errors.guests.message}</p>}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label style={labelStyle}>Special Requests (optional)</label>
        <textarea
          {...register("specialRequests")}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Any dietary requirements or special requests?"
          className="booking-input"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={createBooking.isPending}
        style={{
          width: "100%",
          borderRadius: brandRadii.button,
          background: brandGradients.ctaGold,
          padding: "0.875rem",
          fontWeight: brandTypography.weights.semibold,
          fontSize: brandTypography.sizes.body,
          color: "#FFFFFF",
          border: "none",
          cursor: createBooking.isPending ? "wait" : "pointer",
          opacity: createBooking.isPending ? 0.6 : 1,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          letterSpacing: brandTypography.letterSpacing.wide,
          fontFamily: brandTypography.fonts.body,
        }}
        className="booking-submit"
      >
        {createBooking.isPending ? "Booking..." : "Book Table"}
      </button>

      <style>{`
        .booking-input:focus {
          border-color: ${brandColors.gold[400]} !important;
          box-shadow: 0 0 0 3px ${brandColors.gold[100]} !important;
        }
        .booking-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(212,168,83,0.35);
        }
        @media (max-width: 640px) {
          .booking-grid-2 { grid-template-columns: 1fr !important; }
          .booking-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
