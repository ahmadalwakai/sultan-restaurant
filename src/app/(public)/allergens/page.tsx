import { Box, Container, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";

export const metadata = { title: "Allergen Information | Sultan Restaurant" };

const allergens = [
  { name: "Gluten", icon: "🌾", description: "Wheat, rye, barley" },
  { name: "Dairy", icon: "🧀", description: "Milk, cream, butter, ghee" },
  { name: "Nuts", icon: "🥜", description: "Almonds, cashews, pistachios" },
  { name: "Eggs", icon: "🥚", description: "Found in some breads and desserts" },
  { name: "Fish", icon: "🐟", description: "Fish-based dishes" },
  { name: "Shellfish", icon: "🦐", description: "Prawn and shrimp dishes" },
  { name: "Sesame", icon: "🌱", description: "Sesame seeds in naan and sides" },
  { name: "Mustard", icon: "🌶️", description: "Used in various sauces and curries" },
];

export default function AllergensPage() {
  return (
    <Box minH="screen" bg="gray.50" py={16}>
      <Container maxW="4xl" px={4}>
        <Heading fontFamily="heading" size="xl" fontWeight="bold">Allergen Information</Heading>
        <Text mt={4} color="gray.600">
          We take food allergies very seriously. Please inform staff of any allergies
          when ordering. Below are common allergens found in our dishes.
        </Text>
        <SimpleGrid mt={8} gap={4} columns={{ base: 1, sm: 2 }}>
          {allergens.map((allergen) => (
            <Flex
              key={allergen.name}
              align="center"
              gap={4}
              rounded="xl"
              bg="white"
              p={4}
              shadow="md"
            >
              <Text fontSize="3xl">{allergen.icon}</Text>
              <Box>
                <Heading size="md" fontWeight="bold" color="gray.900">{allergen.name}</Heading>
                <Text fontSize="sm" color="gray.500">{allergen.description}</Text>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
