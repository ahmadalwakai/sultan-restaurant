"use client";

import { Button } from "@chakra-ui/react";
import { useCartStore } from "@/lib/cart";
import type { MenuItemPublic } from "@/types/menu";

interface MenuItemAddButtonProps {
  item: MenuItemPublic;
  size?: "sm" | "md" | "lg";
}

export default function MenuItemAddButton({ item, size = "sm" }: MenuItemAddButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image ?? null,
    });
  };

  return (
    <Button
      size={size}
      colorPalette="brand"
      onClick={handleAdd}
      disabled={!item.isAvailable}
    >
      {item.isAvailable ? "Add to Cart" : "Unavailable"}
    </Button>
  );
}
