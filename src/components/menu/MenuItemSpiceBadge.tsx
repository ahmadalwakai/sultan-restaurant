"use client";

interface MenuItemSpiceBadgeProps {
  level: number;
  maxLevel?: number;
}

export default function MenuItemSpiceBadge({ level, maxLevel = 5 }: MenuItemSpiceBadgeProps) {
  if (level <= 0) return null;

  return (
    <span className="inline-flex items-center gap-0.5" title={`Spice level: ${level}/${maxLevel}`}>
      {Array.from({ length: maxLevel }).map((_, i) => (
        <span key={i} className={`text-xs ${i < level ? "text-red-500" : "text-gray-200"}`}>🌶️</span>
      ))}
    </span>
  );
}
