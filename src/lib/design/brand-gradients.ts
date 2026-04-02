import { brandColors, brandSemanticColors } from "@/theme/branding";

/** Reusable CSS gradient strings */
export const brandGradients = {
  /** Hero dark overlay — light top to dark bottom */
  heroOverlay: `linear-gradient(to bottom, ${brandSemanticColors.overlay.light} 0%, ${brandSemanticColors.overlay.heavy} 100%)`,
  /** CTA gold button background */
  ctaGold: `linear-gradient(135deg, ${brandColors.gold[400]}, ${brandColors.gold[600]})`,
  /** Warm section background tint */
  warmFade: `linear-gradient(to bottom, ${brandColors.gold[50]}00 0%, ${brandColors.gold[50]} 100%)`,
  /** Footer top edge glow */
  footerEdge: `linear-gradient(to bottom, ${brandColors.gold[600]}15 0%, transparent 80px)`,
  /** Text shimmer overlay (decorative) */
  goldText: `linear-gradient(135deg, ${brandColors.gold[400]} 0%, ${brandColors.gold[600]} 50%, ${brandColors.gold[400]} 100%)`,
} as const;
