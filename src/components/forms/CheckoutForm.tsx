"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validators";
import { usePickupSlots } from "@/hooks/checkout";
import { Box, Button, Input, NativeSelect, SimpleGrid, Text, Textarea, VStack } from "@chakra-ui/react";

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
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} gap={4} align="stretch">
      <SimpleGrid gap={4} columns={{ base: 1, sm: 2 }}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Name</Text>
          <Input {...register("customerName")} placeholder="Your name" size="md" />
          {errors.customerName && (
            <Text mt={1} fontSize="xs" color="red.500">{errors.customerName.message}</Text>
          )}
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Phone</Text>
          <Input {...register("customerPhone")} placeholder="07xxx xxx xxx" size="md" />
          {errors.customerPhone && (
            <Text mt={1} fontSize="xs" color="red.500">{errors.customerPhone.message}</Text>
          )}
        </Box>
      </SimpleGrid>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Email</Text>
        <Input {...register("customerEmail")} type="email" placeholder="your@email.com" size="md" />
        {errors.customerEmail && (
          <Text mt={1} fontSize="xs" color="red.500">{errors.customerEmail.message}</Text>
        )}
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Pickup Time</Text>
        <NativeSelect.Root size="md">
          <NativeSelect.Field {...register("pickupTime")}>
            <option value="">Select pickup time</option>
            {slots.map((slot) => (
              <option key={slot.time} value={slot.time}>
                {slot.label}
              </option>
            ))}
          </NativeSelect.Field>
        </NativeSelect.Root>
        {errors.pickupTime && (
          <Text mt={1} fontSize="xs" color="red.500">{errors.pickupTime.message}</Text>
        )}
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">
          Special Instructions (optional)
        </Text>
        <Textarea {...register("specialRequests")} rows={3} placeholder="Any special requests?" size="md" />
      </Box>

      <Button
        type="submit"
        disabled={isLoading}
        w="full"
        borderRadius="lg"
        bg="amber.500"
        py={3}
        fontWeight="semibold"
        color="white"
        _hover={{ bg: "amber.600" }}
        _disabled={{ opacity: 0.5 }}
      >
        {isLoading ? "Processing..." : "Place Order"}
      </Button>
    </VStack>
  );
}
