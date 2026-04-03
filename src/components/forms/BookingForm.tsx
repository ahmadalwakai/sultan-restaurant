"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/lib/validators";
import { useCreateBooking, useBookingAvailability } from "@/hooks/api";
import toast from "react-hot-toast";
import { Box, Button, Input, NativeSelect, SimpleGrid, Text, Textarea, VStack } from "@chakra-ui/react";

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
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} gap={4} align="stretch">
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Name</Text>
        <Input
          {...register("name")}
          placeholder="Your full name"
          size="md"
        />
        {errors.name && <Text mt={1} fontSize="xs" color="red.500">{errors.name.message}</Text>}
      </Box>

      <SimpleGrid gap={4} columns={{ base: 1, sm: 2 }}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Email</Text>
          <Input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            size="md"
          />
          {errors.email && <Text mt={1} fontSize="xs" color="red.500">{errors.email.message}</Text>}
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Phone</Text>
          <Input
            {...register("phone")}
            placeholder="07xxx xxx xxx"
            size="md"
          />
          {errors.phone && <Text mt={1} fontSize="xs" color="red.500">{errors.phone.message}</Text>}
        </Box>
      </SimpleGrid>

      <SimpleGrid gap={4} columns={{ base: 1, sm: 3 }}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Date</Text>
          <Input
            {...register("date")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              register("date").onChange(e);
            }}
            size="md"
          />
          {errors.date && <Text mt={1} fontSize="xs" color="red.500">{errors.date.message}</Text>}
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Time</Text>
          <NativeSelect.Root size="md">
            <NativeSelect.Field {...register("time")}>
              <option value="">Select time</option>
              {availability?.availableSlots?.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </NativeSelect.Field>
          </NativeSelect.Root>
          {errors.time && <Text mt={1} fontSize="xs" color="red.500">{errors.time.message}</Text>}
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Guests</Text>
          <Input
            {...register("guests", { valueAsNumber: true })}
            type="number"
            min={1}
            max={20}
            size="md"
          />
          {errors.guests && <Text mt={1} fontSize="xs" color="red.500">{errors.guests.message}</Text>}
        </Box>
      </SimpleGrid>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">
          Special Requests (optional)
        </Text>
        <Textarea
          {...register("specialRequests")}
          rows={3}
          placeholder="Any dietary requirements or special requests?"
          size="md"
        />
      </Box>

      <Button
        type="submit"
        disabled={createBooking.isPending}
        w="full"
        borderRadius="lg"
        bg="amber.500"
        py={3}
        fontWeight="semibold"
        color="white"
        _hover={{ bg: "amber.600" }}
        _disabled={{ opacity: 0.5 }}
      >
        {createBooking.isPending ? "Booking..." : "Book Table"}
      </Button>
    </VStack>
  );
}
