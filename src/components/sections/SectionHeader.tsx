import { cn } from "@/lib/utils/cn";
import { brandTypography, brandColors } from "@/theme/branding";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true, className, light }: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)} style={{ marginBottom: "2.5rem" }}>
      {/* Gold accent bar */}
      <div
        style={{
          width: 48,
          height: 3,
          borderRadius: 2,
          background: brandColors.gold[500],
          marginBottom: "1rem",
          marginInline: centered ? "auto" : undefined,
        }}
      />
      <h2
        style={{
          fontFamily: brandTypography.fonts.heading,
          fontWeight: brandTypography.weights.bold,
          lineHeight: brandTypography.lineHeights.snug,
          color: light ? "#FFFFFF" : brandColors.charcoal,
          margin: 0,
        }}
        className="section-header-title"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: brandTypography.fonts.body,
            color: light ? "rgba(255,255,255,0.75)" : "#6B7280",
            marginTop: "0.75rem",
            lineHeight: brandTypography.lineHeights.relaxed,
            maxWidth: centered ? "580px" : undefined,
            marginInline: centered ? "auto" : undefined,
          }}
          className="section-header-sub"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
