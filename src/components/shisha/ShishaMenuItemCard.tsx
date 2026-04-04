"use client";

import Image from "next/image";
import { useState } from "react";
import { Box, HStack, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { LuFlame, LuLeaf, LuStar, LuSparkles, LuPlus } from "react-icons/lu";
import { useCartStore } from "@/lib/cart";

interface ShishaMenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  discountedPrice: number | null;
  image: string | null;
  isFeatured: boolean;
  tags: string[];
  intensity: number | null;
}

interface ShishaMenuItemCardProps {
  item: ShishaMenuItem;
}

const intensityConfig: Record<number, { icon: typeof LuFlame; color: string; label: string }> = {
  1: { icon: LuLeaf, color: "#4ADE80", label: "Mild" },
  2: { icon: LuLeaf, color: "#84CC16", label: "Light" },
  3: { icon: LuFlame, color: "#FBBF24", label: "Medium" },
  4: { icon: LuFlame, color: "#EF4444", label: "Strong" },
  5: { icon: LuSparkles, color: "#8B5CF6", label: "Extra Strong" },
};

export function ShishaMenuItemCard({ item }: ShishaMenuItemCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const tableContext = useCartStore((s) => s.tableContext);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    const price = item.discountedPrice && item.discountedPrice < item.price 
      ? item.discountedPrice 
      : item.price;
    
    addItem({
      menuItemId: item.id,
      name: item.name,
      price,
      image: item.image,
      itemType: "SHISHA",
    });
  };

  const IntensityData = item.intensity ? intensityConfig[item.intensity] : null;
  const hasDiscount = item.discountedPrice && item.discountedPrice < item.price;
  const isTableScan = tableContext?.menuType === "SHISHA";

  return (
    <Box
      bg="rgba(255,255,255,0.03)"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid rgba(255,255,255,0.08)"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        borderColor: "rgba(139,92,246,0.3)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image */}
      <Box position="relative" h="180px" bg="rgba(0,0,0,0.3)">
        {item.image && !imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <Box
            w="full"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="linear-gradient(135deg, rgba(139,92,246,0.2), rgba(200,169,81,0.2))"
          >
            <Text fontSize="4xl" opacity={0.5}>🌬️</Text>
          </Box>
        )}
        
        {/* Badges */}
        <HStack position="absolute" top={3} left={3} gap={2}>
          {item.isFeatured && (
            <Box
              bg="#C8A951"
              color="#0D0906"
              px={2}
              py={0.5}
              borderRadius="md"
              fontSize="xs"
              fontWeight="600"
            >
              <LuStar style={{ display: "inline", marginRight: "2px" }} />
              Featured
            </Box>
          )}
        </HStack>

        {/* Discount Badge */}
        {hasDiscount && (
          <Box
            position="absolute"
            top={3}
            right={3}
            bg="#EF4444"
            color="white"
            px={2}
            py={0.5}
            borderRadius="md"
            fontSize="xs"
            fontWeight="700"
          >
            SALE
          </Box>
        )}

        {/* Intensity Badge */}
        {IntensityData && (
          <Box
            position="absolute"
            bottom={3}
            right={3}
            bg="rgba(0,0,0,0.7)"
            color={IntensityData.color}
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
            fontWeight="500"
          >
            <IntensityData.icon style={{ display: "inline", marginRight: "4px" }} />
            {IntensityData.label}
          </Box>
        )}
      </Box>

      {/* Content */}
      <VStack p={5} align="stretch" gap={3}>
        <Heading size="md" color="white" fontWeight="600">
          {item.name}
        </Heading>
        {item.description && (
          <Text fontSize="sm" color="whiteAlpha.600" lineClamp={2}>
            {item.description}
          </Text>
        )}
        {item.tags && item.tags.length > 0 && (
          <HStack gap={2} flexWrap="wrap">
            {item.tags.slice(0, 3).map((tag) => (
              <Box
                key={tag}
                px={2}
                py={0.5}
                bg="rgba(139,92,246,0.15)"
                borderRadius="md"
                fontSize="xs"
                color="#A78BFA"
              >
                {tag}
              </Box>
            ))}
          </HStack>
        )}
        <HStack justify="space-between" align="center" pt={2}>
          <HStack gap={2}>
            {hasDiscount ? (
              <>
                <Text fontSize="xl" fontWeight="700" color="#8B5CF6">
                  £{item.discountedPrice?.toFixed(2)}
                </Text>
                <Text fontSize="sm" textDecoration="line-through" color="whiteAlpha.500">
                  £{item.price.toFixed(2)}
                </Text>
              </>
            ) : (
              <Text fontSize="xl" fontWeight="700" color="#8B5CF6">
                £{item.price.toFixed(2)}
              </Text>
            )}
          </HStack>
          
          {/* Add to Order button - only show for table scan orders */}
          {isTableScan && (
            <Button
              size="sm"
              colorPalette="purple"
              onClick={handleAdd}
            >
              <LuPlus /> Add
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
