import { brandTypography, brandColors } from "@/theme/branding";
import type { ReactNode } from "react";

interface SectionIntroProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  accent?: ReactNode;
}

/** Section header block with brand typography, optional gold divider, and subtitle. */
export function SectionIntro({ title, subtitle, centered = true, accent }: SectionIntroProps) {
  return (
    <div style={{ textAlign: centered ? "center" : "left", marginBottom: "2.5rem" }}>
      {accent && <div style={{ marginBottom: "0.75rem" }}>{accent}</div>}
      <h2
        style={{
          fontFamily: brandTypography.fonts.heading,
          fontWeight: brandTypography.weights.bold,
          lineHeight: brandTypography.lineHeights.snug,
          color: brandColors.charcoal,
          fontSize: brandTypography.sizes.sectionTitle.mobile,
          margin: 0,
        }}
        className="section-intro-title"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: brandTypography.fonts.body,
            color: "#6B7280",
            marginTop: "0.75rem",
            fontSize: brandTypography.sizes.sectionSub.mobile,
            lineHeight: brandTypography.lineHeights.relaxed,
            maxWidth: centered ? "600px" : undefined,
            marginInline: centered ? "auto" : undefined,
          }}
          className="section-intro-sub"
        >
          {subtitle}
        </p>
      )}
      <style>{`
        @media (min-width: 768px) {
          .section-intro-title { font-size: ${brandTypography.sizes.sectionTitle.tablet} !important; }
          .section-intro-sub { font-size: ${brandTypography.sizes.sectionSub.desktop} !important; }
        }
        @media (min-width: 1024px) {
          .section-intro-title { font-size: ${brandTypography.sizes.sectionTitle.desktop} !important; }
        }
      `}</style>
    </div>
  );
}
