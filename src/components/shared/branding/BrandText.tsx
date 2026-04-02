import { brandTypography } from "@/theme/branding";

interface BrandTextProps {
  children: React.ReactNode;
  variant?: "body" | "small" | "muted" | "caption";
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<string, React.CSSProperties> = {
  body: {
    fontSize: brandTypography.sizes.body,
    lineHeight: brandTypography.lineHeights.relaxed,
    color: "#4B5563",
  },
  small: {
    fontSize: brandTypography.sizes.small,
    lineHeight: brandTypography.lineHeights.normal,
    color: "#6B7280",
  },
  muted: {
    fontSize: brandTypography.sizes.small,
    lineHeight: brandTypography.lineHeights.normal,
    color: "#9CA3AF",
  },
  caption: {
    fontSize: brandTypography.sizes.xs,
    lineHeight: brandTypography.lineHeights.normal,
    color: "#9CA3AF",
    letterSpacing: brandTypography.letterSpacing.wide,
    textTransform: "uppercase" as const,
  },
};

/** Body text component with brand font and preset variants */
export function BrandText({
  children,
  variant = "body",
  className,
  style,
}: BrandTextProps) {
  return (
    <p
      className={className}
      style={{
        fontFamily: brandTypography.fonts.body,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </p>
  );
}
