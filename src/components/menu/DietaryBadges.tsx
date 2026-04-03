"use client";

import { LuLeaf, LuWheat, LuFlame, LuHeart, LuShieldCheck, LuVegan } from "react-icons/lu";

type DietaryType = "vegetarian" | "vegan" | "gluten-free" | "halal" | "spicy" | "mild" | "hot";

const dietaryConfig: Record<DietaryType, { icon: any; label: string; color: string; bg: string }> = {
  vegetarian: { icon: LuLeaf, label: "Vegetarian", color: "#22C55E", bg: "rgba(34, 197, 94, 0.15)" },
  vegan: { icon: LuVegan, label: "Vegan", color: "#10B981", bg: "rgba(16, 185, 129, 0.15)" },
  "gluten-free": { icon: LuWheat, label: "Gluten-Free", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)" },
  halal: { icon: LuShieldCheck, label: "Halal", color: "#C8A951", bg: "rgba(200, 169, 81, 0.15)" },
  spicy: { icon: LuFlame, label: "Spicy", color: "#EF4444", bg: "rgba(239, 68, 68, 0.15)" },
  mild: { icon: LuHeart, label: "Mild", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.15)" },
  hot: { icon: LuFlame, label: "Hot", color: "#DC2626", bg: "rgba(220, 38, 38, 0.15)" },
};

interface DietaryBadgeProps {
  type: DietaryType;
  size?: "sm" | "md";
  showLabel?: boolean;
}

/**
 * Dietary badge with icon and optional label
 */
export function DietaryBadge({ type, size = "sm", showLabel = true }: DietaryBadgeProps) {
  const config = dietaryConfig[type];
  if (!config) return null;

  const Icon = config.icon;
  const iconSize = size === "sm" ? 12 : 16;
  const padding = size === "sm" ? "4px 8px" : "6px 12px";
  const fontSize = size === "sm" ? "11px" : "13px";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding,
        borderRadius: "20px",
        background: config.bg,
        border: `1px solid ${config.color}30`,
        color: config.color,
        fontSize,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={iconSize} />
      {showLabel && config.label}
    </span>
  );
}

interface SpiceLevelProps {
  level: 0 | 1 | 2 | 3;
}

/**
 * Spice level indicator with flames
 */
export function SpiceLevel({ level }: SpiceLevelProps) {
  if (level === 0) return null;

  const colors = ["#F59E0B", "#EF4444", "#DC2626"];
  const labels = ["Mild", "Medium", "Hot"];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
        padding: "4px 8px",
        borderRadius: "20px",
        background: "rgba(239, 68, 68, 0.1)",
        fontSize: "11px",
        fontWeight: 600,
        color: colors[level - 1],
      }}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <LuFlame
          key={i}
          size={12}
          style={{
            opacity: i < level ? 1 : 0.2,
            color: i < level ? colors[level - 1] : "#666",
          }}
        />
      ))}
      <span style={{ marginLeft: "4px" }}>{labels[level - 1]}</span>
    </span>
  );
}

interface DietaryBadgeListProps {
  types: DietaryType[];
  size?: "sm" | "md";
}

/**
 * List of dietary badges
 */
export function DietaryBadgeList({ types, size = "sm" }: DietaryBadgeListProps) {
  if (!types.length) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {types.map((type) => (
        <DietaryBadge key={type} type={type} size={size} />
      ))}
    </div>
  );
}
