"use client";

import Link from "next/link";
import { Box, Container, HStack, VStack, Text } from "@chakra-ui/react";
import { Flame, Globe, Utensils, ChefHat, Salad, Wheat, Users, Cake } from "lucide-react";

const cuisines = [
  { label: "Charcoal Grills", icon: Flame, href: "/menu?category=grills" },
  { label: "Middle Eastern", icon: Globe, href: "/menu?category=middle-eastern" },
  { label: "Shawarma & Wraps", icon: Utensils, href: "/menu?category=shawarma" },
  { label: "Indian Classics", icon: ChefHat, href: "/menu?category=indian" },
  { label: "Mezzeh & Starters", icon: Salad, href: "/menu?category=starters" },
  { label: "Breads & Sides", icon: Wheat, href: "/menu?category=breads" },
  { label: "Family Platters", icon: Users, href: "/menu?category=platters" },
  { label: "Desserts", icon: Cake, href: "/menu?category=desserts" },
];

export function CuisineTypesBar() {
  return (
    <Box as="section" py={6} bg="bg.canvas" borderBottom="1px solid" borderColor="gray.100">
      <Container maxW="7xl" px={{ base: 0, md: 8 }}>
        <HStack
          gap={4}
          overflowX="auto"
          px={{ base: 5, md: 0 }}
          css={{ "&::-webkit-scrollbar": { display: "none" } }}
        >
          {cuisines.map(c => (
            <Link key={c.label} href={c.href}>
              <VStack
                minW="100px"
                gap={2}
                p={3}
                borderRadius="xl"
                bg="bg.surface"
                shadow="sm"
                cursor="pointer"
                _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <Box color="brand.primary">
                  <c.icon size={20} />
                </Box>
                <Text fontSize="xs" fontWeight="medium" color="fg.default" whiteSpace="nowrap">
                  {c.label}
                </Text>
              </VStack>
            </Link>
          ))}
        </HStack>
      </Container>
    </Box>
  );
}
