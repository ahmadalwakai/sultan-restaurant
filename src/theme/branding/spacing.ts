/** Sultan Restaurant — Spacing Tokens */

export const brandSpacing = {
  /** Vertical spacing between major homepage sections */
  section: { mobile: "3.5rem", tablet: "5rem", desktop: "6rem" },
  /** Container horizontal padding */
  container: { mobile: "1.25rem", tablet: "2rem", desktop: "3rem" },
  /** Maximum content width */
  maxWidth: {
    narrow: "720px",
    content: "960px",
    wide: "1200px",
    full: "1400px",
  },
  /** Hero bottom padding (above fold) */
  heroBottom: { mobile: "5rem", desktop: "7.5rem" },
  /** Gap between stacked elements */
  stack: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
} as const;
