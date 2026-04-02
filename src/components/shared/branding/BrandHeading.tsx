import { brandColors } from "@/theme/branding";
import { brandTypography } from "@/theme/branding";

interface BrandHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  accent?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Section heading using brand serif font and gold accent support */
export function BrandHeading({
  children,
  as: Tag = "h2",
  accent,
  className,
  style,
}: BrandHeadingProps) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily: brandTypography.fonts.heading,
        fontWeight: brandTypography.weights.extrabold,
        lineHeight: brandTypography.lineHeights.snug,
        color: brandColors.charcoal,
        ...style,
      }}
    >
      {accent ? (
        <>
          {children}{" "}
          <span style={{ color: brandColors.gold[400], fontStyle: "italic" }}>
            {accent}
          </span>
        </>
      ) : (
        children
      )}
    </Tag>
  );
}
