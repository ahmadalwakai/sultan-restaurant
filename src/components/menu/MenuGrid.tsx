"use client";

import { SimpleGrid } from "@chakra-ui/react";
import { useMenu } from "@/hooks/api";
import { MenuItemCard } from "@/components/cards/MenuItemCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { StaggerContainer, StaggerItem } from "@/components/animation";

interface MenuGridProps {
  params?: Record<string, string>;
}

export function MenuGrid({ params }: MenuGridProps) {
  const { data, isLoading, error, refetch } = useMenu(params);

  if (isLoading) return <LoadingState message="Loading menu..." />;
  if (error) return <ErrorState message="Failed to load menu" onRetry={() => refetch()} />;
  if (!data?.items?.length) return <EmptyState message="No menu items found" />;

  return (
    <StaggerContainer staggerDelay={0.06}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
        {data.items.map((item) => (
          <StaggerItem key={item.id}>
            <MenuItemCard item={item} />
          </StaggerItem>
        ))}
      </SimpleGrid>
    </StaggerContainer>
  );
}
