"use client";

import Image from "next/image";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useCartStore } from "@/lib/cart";
import type { MenuItemPublic } from "@/types/menu";
import { brandTypography, brandRadii, brandShadows, brandColors } from "@/theme/branding";
import { brandGradients } from "@/lib/design";

interface MenuItemCardProps {
  item: MenuItemPublic;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image ?? null,
    });
  };

  const dietaryBadges = [
    item.isVegetarian && { label: "V", color: "#16A34A" },
    item.isVegan && { label: "VG", color: "#15803D" },
    item.isGlutenFree && { label: "GF", color: "#2563EB" },
  ].filter(Boolean) as { label: string; color: string }[];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: brandRadii.card,
        background: "#FFFFFF",
        boxShadow: brandShadows.card,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      className="menu-item-card"
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
        {item.image && !imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            unoptimized
            className="object-cover"
            style={{ transition: "transform 0.5s ease" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${brandColors.gold[50]}, ${brandColors.cream})`,
            }}
          >
            <span style={{ fontSize: "3rem" }}>🍛</span>
          </div>
        )}
        {/* Popular badge */}
        {item.isPopular && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              borderRadius: brandRadii.badge,
              background: brandGradients.ctaGold,
              padding: "0.2rem 0.75rem",
              fontSize: brandTypography.sizes.badge,
              fontWeight: brandTypography.weights.bold,
              color: "#FFFFFF",
              letterSpacing: brandTypography.letterSpacing.badge,
              textTransform: "uppercase",
            }}
          >
            Popular
          </span>
        )}
        {/* Dietary badges */}
        {dietaryBadges.length > 0 && (
          <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 4 }}>
            {dietaryBadges.map((badge) => (
              <span
                key={badge.label}
                style={{
                  background: badge.color,
                  borderRadius: brandRadii.badge,
                  padding: "0.15rem 0.5rem",
                  fontSize: "0.625rem",
                  fontWeight: brandTypography.weights.bold,
                  color: "#FFFFFF",
                }}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "1.25rem" }}>
        <h3
          style={{
            fontFamily: brandTypography.fonts.heading,
            fontSize: "1.1rem",
            fontWeight: brandTypography.weights.bold,
            color: brandColors.charcoal,
            margin: 0,
          }}
        >
          {item.name}
        </h3>
        {item.description && (
          <p
            style={{
              marginTop: "0.375rem",
              fontSize: brandTypography.sizes.small,
              color: "#6B7280",
              lineHeight: brandTypography.lineHeights.relaxed,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontFamily: brandTypography.fonts.body,
            }}
          >
            {item.description}
          </p>
        )}
        {item.spiceLevel > 0 && (
          <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: 2 }}>
            {Array.from({ length: item.spiceLevel }).map((_, i) => (
              <span key={i} style={{ fontSize: "0.75rem" }}>🌶️</span>
            ))}
          </div>
        )}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "1.125rem",
              fontWeight: brandTypography.weights.bold,
              color: brandColors.gold[600],
              fontFamily: brandTypography.fonts.body,
            }}
          >
            {formatCurrency(item.price)}
          </span>
          <button
            onClick={handleAdd}
            disabled={!item.isAvailable}
            style={{
              borderRadius: brandRadii.button,
              background: item.isAvailable ? brandColors.gold[600] : "#D1D5DB",
              padding: "0.5rem 1.25rem",
              fontSize: brandTypography.sizes.small,
              fontWeight: brandTypography.weights.semibold,
              color: "#FFFFFF",
              border: "none",
              cursor: item.isAvailable ? "pointer" : "not-allowed",
              transition: "background 0.2s ease",
              opacity: item.isAvailable ? 1 : 0.5,
            }}
            className="menu-add-btn"
          >
            {item.isAvailable ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
      <style>{`
        .menu-item-card:hover {
          box-shadow: ${brandShadows.cardHover};
          transform: translateY(-4px);
        }
        .menu-item-card:hover img {
          transform: scale(1.05);
        }
        .menu-add-btn:hover:not(:disabled) {
          background: ${brandColors.gold[700]} !important;
        }
      `}</style>
    </div>
  );
}
