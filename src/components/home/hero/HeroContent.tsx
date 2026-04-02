"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/content";
import { brandColors, brandTypography, brandRadii } from "@/theme/branding";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

/** Hero text block: cuisine badge + headline + subheadline */
export function HeroContent() {
  return (
    <>
      {/* Cuisine badge */}
      <motion.div {...fadeUp(0.2)} style={{ marginBottom: 24 }}>
        <span
          style={{
            display: "inline-flex",
            border: `1px solid ${brandColors.gold[400]}66`,
            background: `${brandColors.gold[400]}1A`,
            borderRadius: brandRadii.badge,
            padding: "8px 20px",
            color: brandColors.gold[400],
            fontSize: brandTypography.sizes.badge,
            letterSpacing: brandTypography.letterSpacing.badge,
            textTransform: "uppercase",
            fontWeight: brandTypography.weights.semibold,
            fontFamily: brandTypography.fonts.body,
          }}
        >
          {heroContent.cuisineBadge}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.4)}
        className="hero-headline"
        style={{
          fontFamily: brandTypography.fonts.accent,
          fontWeight: brandTypography.weights.extrabold,
          lineHeight: brandTypography.lineHeights.tight,
          color: brandColors.cream,
          marginBottom: 20,
        }}
      >
        {heroContent.headline.line1}
        <br />
        <em style={{ color: brandColors.gold[400], fontStyle: "italic" }}>
          {heroContent.headline.accent}
        </em>
        <br />
        {heroContent.headline.line3}
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        {...fadeUp(0.6)}
        className="hero-sub"
        style={{
          fontFamily: brandTypography.fonts.body,
          color: "rgba(255,255,255,0.7)",
          lineHeight: brandTypography.lineHeights.relaxed,
          maxWidth: 500,
          marginBottom: 36,
        }}
      >
        {heroContent.subheadline}
      </motion.p>
    </>
  );
}
