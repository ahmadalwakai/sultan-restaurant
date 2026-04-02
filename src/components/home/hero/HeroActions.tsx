"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroContent } from "@/lib/content";
import { brandColors, brandRadii, brandTypography } from "@/theme/branding";
import { brandShadows } from "@/theme/branding";
import { brandGradients } from "@/lib/design";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export function HeroActions() {
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  return (
    <motion.div
      {...fadeUp(0.8)}
      className="hero-ctas"
      style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
    >
      <Link href={heroContent.cta.primary.href} style={{ textDecoration: "none" }}>
        <button
          type="button"
          style={{
            background: brandGradients.ctaGold,
            color: "#000",
            padding: "16px 36px",
            borderRadius: brandRadii.button,
            fontWeight: brandTypography.weights.bold,
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            transform: hoverPrimary ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hoverPrimary ? brandShadows.ctaHover : "none",
          }}
          onMouseEnter={() => setHoverPrimary(true)}
          onMouseLeave={() => setHoverPrimary(false)}
        >
          {heroContent.cta.primary.label}
        </button>
      </Link>

      <Link href={heroContent.cta.secondary.href} style={{ textDecoration: "none" }}>
        <button
          type="button"
          style={{
            background: hoverSecondary ? brandColors.gold[400] : "transparent",
            color: hoverSecondary ? "#000" : brandColors.gold[400],
            border: `2px solid ${brandColors.gold[400]}`,
            padding: "16px 36px",
            borderRadius: brandRadii.button,
            fontWeight: brandTypography.weights.bold,
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={() => setHoverSecondary(true)}
          onMouseLeave={() => setHoverSecondary(false)}
        >
          {heroContent.cta.secondary.label}
        </button>
      </Link>
    </motion.div>
  );
}
