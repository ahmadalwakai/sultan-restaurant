import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import type { BookingPublic, BookingAvailability, CreateBookingInput } from "@/types/booking";
import type { ApiResponse } from "@/types/common";

export function useBookingAvailability(date: string) {
  return useQuery({
    queryKey: queryKeys.bookings.availability(date),
    queryFn: async () => {
      const res = await fetch(`/api/bookings/availability?date=${date}`);
      const json: ApiResponse<BookingAvailability> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    enabled: !!date,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateBookingInput) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: ApiResponse<BookingPublic> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
    },
  });
}
