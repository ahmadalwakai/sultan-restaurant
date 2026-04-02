"use client";

interface MenuItemDietaryBadgeProps {
  type: "vegetarian" | "vegan" | "gluten-free" | "halal" | "dairy-free" | "nut-free";
}

const badges: Record<string, { label: string; emoji: string; color: string }> = {
  vegetarian: { label: "Vegetarian", emoji: "🥬", color: "bg-green-100 text-green-700" },
  vegan: { label: "Vegan", emoji: "🌱", color: "bg-green-100 text-green-800" },
  "gluten-free": { label: "Gluten Free", emoji: "🌾", color: "bg-blue-100 text-blue-700" },
  halal: { label: "Halal", emoji: "☪️", color: "bg-emerald-100 text-emerald-700" },
  "dairy-free": { label: "Dairy Free", emoji: "🥛", color: "bg-purple-100 text-purple-700" },
  "nut-free": { label: "Nut Free", emoji: "🥜", color: "bg-orange-100 text-orange-700" },
};

export default function MenuItemDietaryBadge({ type }: MenuItemDietaryBadgeProps) {
  const badge = badges[type];
  if (!badge) return null;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.color}`}>
      <span>{badge.emoji}</span>
      {badge.label}
    </span>
  );
}
