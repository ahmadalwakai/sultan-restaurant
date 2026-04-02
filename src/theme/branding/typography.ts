/** Sultan Restaurant — Typography Tokens */

export const brandTypography = {
  fonts: {
    heading: "var(--font-heading), 'Playfair Display', Georgia, serif",
    body: "var(--font-body), 'Inter', 'DM Sans', sans-serif",
    accent: "'Playfair Display', Georgia, serif",
  },
  sizes: {
    heroHeadline: { mobile: "2.75rem", tablet: "3.75rem", desktop: "4.5rem" },
    heroSub: { mobile: "0.9375rem", tablet: "1.125rem", desktop: "1.25rem" },
    sectionTitle: { mobile: "1.75rem", tablet: "2.25rem", desktop: "2.5rem" },
    sectionSub: { mobile: "0.875rem", desktop: "1rem" },
    body: "1rem",
    small: "0.875rem",
    xs: "0.75rem",
    badge: "0.6875rem",
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    tight: 1.05,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.65,
  },
  letterSpacing: {
    tight: "-0.01em",
    normal: "0",
    wide: "0.04em",
    wider: "0.08em",
    widest: "0.18em",
    badge: "0.12em",
  },
} as const;
