"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, type CheckoutFormValues } from "@/lib/validators";
import { usePickupSlots } from "@/hooks/checkout";
import { Box, Button, Input, NativeSelect, SimpleGrid, Text, Textarea, VStack, HStack } from "@chakra-ui/react";
import { HiCreditCard, HiBanknotes } from "react-icons/hi2";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  isLoading?: boolean;
}

export function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const { slots } = usePickupSlots();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      paymentMethod: "STRIPE",
    },
  });

  const selectedPayment = watch("paymentMethod");

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

      {/* Payment Method Selection */}
      <Box>
        <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
          Payment Method
        </Text>
        <HStack gap={3}>
          <Box
            onClick={() => setValue("paymentMethod", "STRIPE")}
            flex={1}
            p={4}
            borderRadius="lg"
            border="2px solid"
            borderColor={selectedPayment === "STRIPE" ? "amber.500" : "gray.200"}
            bg={selectedPayment === "STRIPE" ? "amber.50" : "white"}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ borderColor: "amber.400" }}
          >
            <VStack gap={1}>
              <HiCreditCard size={24} color={selectedPayment === "STRIPE" ? "#D97706" : "#6B7280"} />
              <Text fontSize="sm" fontWeight="semibold" color={selectedPayment === "STRIPE" ? "amber.700" : "gray.600"}>
                Pay Now
              </Text>
              <Text fontSize="xs" color="gray.500">Card / Apple Pay</Text>
            </VStack>
          </Box>
          <Box
            onClick={() => setValue("paymentMethod", "CASH")}
            flex={1}
            p={4}
            borderRadius="lg"
            border="2px solid"
            borderColor={selectedPayment === "CASH" ? "amber.500" : "gray.200"}
            bg={selectedPayment === "CASH" ? "amber.50" : "white"}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ borderColor: "amber.400" }}
          >
            <VStack gap={1}>
              <HiBanknotes size={24} color={selectedPayment === "CASH" ? "#D97706" : "#6B7280"} />
              <Text fontSize="sm" fontWeight="semibold" color={selectedPayment === "CASH" ? "amber.700" : "gray.600"}>
                Pay at Pickup
              </Text>
              <Text fontSize="xs" color="gray.500">Cash / Card</Text>
            </VStack>
          </Box>
        </HStack>
        <input type="hidden" {...register("paymentMethod")} />
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
        {isLoading ? "Processing..." : selectedPayment === "STRIPE" ? "Pay Now" : "Place Order"}
      </Button>
    </VStack>
  );
}
