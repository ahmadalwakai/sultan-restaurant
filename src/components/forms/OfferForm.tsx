"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { offerAdminSchema, type OfferAdminFormValues } from "@/lib/validators";
import { Box, Button, Input, NativeSelect, SimpleGrid, Text, Textarea, VStack } from "@chakra-ui/react";

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
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} gap={4} align="stretch">
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Title</Text>
        <Input {...register("title")} size="md" />
        {errors.title && <Text mt={1} fontSize="xs" color="red.500">{errors.title.message}</Text>}
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Description</Text>
        <Textarea {...register("description")} rows={3} size="md" />
      </Box>

      <SimpleGrid gap={4} columns={{ base: 1, sm: 2 }}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Discount Type</Text>
          <NativeSelect.Root size="md">
            <NativeSelect.Field {...register("discountType")}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED">Fixed Amount</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Discount Value</Text>
          <Input {...register("discountValue", { valueAsNumber: true })} type="number" size="md" />
          {errors.discountValue && (
            <Text mt={1} fontSize="xs" color="red.500">{errors.discountValue.message}</Text>
          )}
        </Box>
      </SimpleGrid>

      <SimpleGrid gap={4} columns={{ base: 1, sm: 2 }}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Valid From</Text>
          <Input {...register("validFrom")} type="date" size="md" />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Valid Until</Text>
          <Input {...register("validUntil")} type="date" size="md" />
        </Box>
      </SimpleGrid>

      <Button
        type="submit"
        disabled={isLoading}
        borderRadius="lg"
        bg="amber.500"
        px={6}
        py={2.5}
        fontWeight="semibold"
        color="white"
        _hover={{ bg: "amber.600" }}
        _disabled={{ opacity: 0.5 }}
      >
        {isLoading ? "Saving..." : defaultValues ? "Update Offer" : "Create Offer"}
      </Button>
    </VStack>
  );
}
