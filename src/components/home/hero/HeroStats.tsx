"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/lib/content";
import { brandColors } from "@/theme/branding";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

/** Star rating + review count below the hero CTAs */
export function HeroStats() {
  return (
    <motion.div
      {...fadeUp(1.0)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 32,
      }}
    >
      <span
        style={{ color: brandColors.gold[400], fontSize: 16, letterSpacing: 2 }}
        aria-label={`${heroContent.rating.stars} stars`}
      >
        {"★".repeat(heroContent.rating.stars)}
      </span>
      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
        {heroContent.rating.score} · {heroContent.rating.text}
      </span>
    </motion.div>
  );
}
