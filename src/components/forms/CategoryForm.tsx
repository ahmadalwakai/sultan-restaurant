"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryAdminSchema, type CategoryAdminFormValues } from "@/lib/validators";
import { Box, Button, Input, Text, Textarea, VStack } from "@chakra-ui/react";

interface CategoryFormProps {
  defaultValues?: Partial<CategoryAdminFormValues>;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function CategoryForm({ defaultValues, onSubmit, isLoading }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryAdminFormValues>({
    resolver: zodResolver(categoryAdminSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: CategoryAdminFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    onSubmit(formData);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(handleFormSubmit)} gap={4} align="stretch">
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Category Name</Text>
        <Input {...register("name")} placeholder="e.g. Starters, Main Course" size="md" />
        {errors.name && <Text mt={1} fontSize="xs" color="red.500">{errors.name.message}</Text>}
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Description (optional)</Text>
        <Textarea {...register("description")} rows={3} placeholder="Describe this category" size="md" />
      </Box>

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
        {isLoading ? "Saving..." : defaultValues ? "Update Category" : "Create Category"}
      </Button>
    </VStack>
  );
}
