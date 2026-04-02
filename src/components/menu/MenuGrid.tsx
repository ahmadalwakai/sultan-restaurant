"use client";

import { useMenu } from "@/hooks/api";
import { MenuItemCard } from "@/components/cards/MenuItemCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";

interface MenuGridProps {
  params?: Record<string, string>;
}

export function MenuGrid({ params }: MenuGridProps) {
  const { data, isLoading, error, refetch } = useMenu(params);

  if (isLoading) return <LoadingState message="Loading menu..." />;
  if (error) return <ErrorState message="Failed to load menu" onRetry={() => refetch()} />;
  if (!data?.items?.length) return <EmptyState message="No menu items found" />;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
