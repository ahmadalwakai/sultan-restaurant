"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/lib/validators";
import { useCreateBooking, useBookingAvailability } from "@/hooks/api";
import toast from "react-hot-toast";
import { Box, Button, Input, NativeSelect, SimpleGrid, Text, Textarea, VStack, HStack } from "@chakra-ui/react";
import { LuCheck, LuX, LuLoader } from "react-icons/lu";

interface BookingFormProps {
  onSuccess?: () => void;
}

type TableAvailability = {
  totalTables: number;
  availableTables: number;
  isAvailable: boolean;
};

export function BookingForm({ onSuccess }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [tableAvailability, setTableAvailability] = useState<TableAvailability | null>(null);
  const [checkingTables, setCheckingTables] = useState(false);
  
  const { data: availability } = useBookingAvailability(selectedDate);
  const createBooking = useCreateBooking();

  // Check table availability when date, time, or guests change
  useEffect(() => {
    if (!selectedDate || !selectedTime || !selectedGuests) {
      setTableAvailability(null);
      return;
    }

    const checkAvailability = async () => {
      setCheckingTables(true);
      try {
        const params = new URLSearchParams({
          date: selectedDate,
          time: selectedTime,
          guests: String(selectedGuests),
        });
        const res = await fetch(`/api/tables/available?${params}`);
        const data = await res.json();
        if (data.success) {
          setTableAvailability(data.data);
        }
      } catch (error) {
        console.error("Error checking tables:", error);
      }
      setCheckingTables(false);
    };

    checkAvailability();
  }, [selectedDate, selectedTime, selectedGuests]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      bookingType: "TABLE",
      guests: 2,
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    if (tableAvailability && !tableAvailability.isAvailable) {
      toast.error("No tables available for this time. Please choose a different time.");
      return;
    }

    createBooking.mutate(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: data.guests,
        bookingType: "TABLE",
        specialRequests: data.specialRequests,
      },
      {
        onSuccess: () => {
          toast.success("Table booked successfully!");
          reset();
          setTableAvailability(null);
          setSelectedDate("");
          setSelectedTime("");
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
              setSelectedTime(""); // Reset time when date changes
              register("date").onChange(e);
            }}
            size="md"
          />
          {errors.date && <Text mt={1} fontSize="xs" color="red.500">{errors.date.message}</Text>}
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Time</Text>
          <NativeSelect.Root size="md">
            <NativeSelect.Field 
              {...register("time")}
              onChange={(e) => {
                setSelectedTime(e.target.value);
                register("time").onChange(e);
              }}
            >
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
            onChange={(e) => {
              setSelectedGuests(Number(e.target.value) || 2);
              register("guests", { valueAsNumber: true }).onChange(e);
            }}
          />
          {errors.guests && <Text mt={1} fontSize="xs" color="red.500">{errors.guests.message}</Text>}
        </Box>
      </SimpleGrid>

      {/* Table Availability Display */}
      {selectedDate && selectedTime && (
        <Box 
          p={3} 
          borderRadius="md" 
          bg={checkingTables ? "gray.50" : tableAvailability?.isAvailable ? "green.50" : "red.50"}
          border="1px solid"
          borderColor={checkingTables ? "gray.200" : tableAvailability?.isAvailable ? "green.200" : "red.200"}
        >
          {checkingTables ? (
            <HStack gap={2}>
              <LuLoader size={16} style={{ animation: "spin 1s linear infinite" }} />
              <Text fontSize="sm" color="gray.600">Checking table availability...</Text>
            </HStack>
          ) : tableAvailability ? (
            <HStack gap={2}>
              {tableAvailability.isAvailable ? (
                <>
                  <LuCheck size={16} color="#16A34A" />
                  <Text fontSize="sm" color="green.700">
                    ✓ {tableAvailability.availableTables} of {tableAvailability.totalTables} tables available
                  </Text>
                </>
              ) : (
                <>
                  <LuX size={16} color="#DC2626" />
                  <Text fontSize="sm" color="red.700">
                    No tables available for this time. Please try a different time.
                  </Text>
                </>
              )}
            </HStack>
          ) : null}
        </Box>
      )}

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
