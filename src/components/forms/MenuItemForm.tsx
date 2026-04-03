"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuAdminSchema, type MenuAdminFormValues } from "@/lib/validators";
import { useAdminCategories } from "@/hooks/admin";
import { Box, Button, HStack, Input, NativeSelect, SimpleGrid, Text, Textarea, VStack } from "@chakra-ui/react";

interface MenuItemFormProps {
  defaultValues?: Partial<MenuAdminFormValues>;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function MenuItemForm({ defaultValues, onSubmit, isLoading }: MenuItemFormProps) {
  const { data: categories } = useAdminCategories();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuAdminFormValues>({
    resolver: zodResolver(menuAdminSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: MenuAdminFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("categoryId", data.categoryId);
    if (data.description) formData.append("description", data.description);
    if (data.spiceLevel) formData.append("spiceLevel", String(data.spiceLevel));
    if (data.isVegetarian) formData.append("isVegetarian", "true");
    if (data.isVegan) formData.append("isVegan", "true");
    if (data.isGlutenFree) formData.append("isGlutenFree", "true");
    if (data.isPopular) formData.append("isPopular", "true");
    if (imageFile) formData.append("image", imageFile);
    onSubmit(formData);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(handleFormSubmit)} gap={4} align="stretch">
      <SimpleGrid gap={4} columns={{ base: 1, sm: 2 }}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Item Name</Text>
          <Input {...register("name")} size="md" />
          {errors.name && <Text mt={1} fontSize="xs" color="red.500">{errors.name.message}</Text>}
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Price (£)</Text>
          <Input {...register("price", { valueAsNumber: true })} type="number" step="0.01" size="md" />
          {errors.price && <Text mt={1} fontSize="xs" color="red.500">{errors.price.message}</Text>}
        </Box>
      </SimpleGrid>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Category</Text>
        <NativeSelect.Root size="md">
          <NativeSelect.Field {...register("categoryId")}>
            <option value="">Select category</option>
            {(categories as { id: string; name: string }[] | undefined)?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </NativeSelect.Field>
        </NativeSelect.Root>
        {errors.categoryId && <Text mt={1} fontSize="xs" color="red.500">{errors.categoryId.message}</Text>}
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Description</Text>
        <Textarea {...register("description")} rows={3} size="md" />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Image</Text>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          style={{ width: "100%", fontSize: "0.875rem" }}
        />
      </Box>

      <SimpleGrid gap={4} columns={{ base: 1, sm: 2 }}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Spice Level (0-5)</Text>
          <Input {...register("spiceLevel", { valueAsNumber: true })} type="number" min={0} max={5} size="md" />
        </Box>
      </SimpleGrid>

      <HStack gap={6} flexWrap="wrap">
        <HStack as="label" gap={2} fontSize="sm">
          <input {...register("isVegetarian")} type="checkbox" />
          <Text>Vegetarian</Text>
        </HStack>
        <HStack as="label" gap={2} fontSize="sm">
          <input {...register("isVegan")} type="checkbox" />
          <Text>Vegan</Text>
        </HStack>
        <HStack as="label" gap={2} fontSize="sm">
          <input {...register("isGlutenFree")} type="checkbox" />
          <Text>Gluten Free</Text>
        </HStack>
        <HStack as="label" gap={2} fontSize="sm">
          <input {...register("isPopular")} type="checkbox" />
          <Text>Popular</Text>
        </HStack>
      </HStack>

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
        {isLoading ? "Saving..." : defaultValues ? "Update Item" : "Create Item"}
      </Button>
    </VStack>
  );
}
