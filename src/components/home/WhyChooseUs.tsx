import { SectionHeader } from "@/components/sections/SectionHeader";
import { ctaCopy, sectionTones } from "@/lib/homepage";
import { brandTypography, brandColors, brandRadii, brandShadows, brandSpacing } from "@/theme/branding";

const features = [
  {
    icon: "\uD83C\uDF3F",
    title: "Fresh Ingredients",
    description: "Locally sourced produce and authentic spices imported directly",
  },
  {
    icon: "\uD83D\uDC68\u200D\uD83C\uDF73",
    title: "Expert Chefs",
    description: "Our team of chefs brings decades of culinary expertise",
  },
  {
    icon: "\u23F0",
    title: "Fast Service",
    description: "Quick preparation without compromising on quality or taste",
  },
  {
    icon: "\u2764\uFE0F",
    title: "Made with Love",
    description: "Every dish is prepared with care and attention to detail",
  },
];

export function WhyChooseUs() {
  return (
    <section style={{ background: sectionTones.cream }} className="why-section">
      <div
        style={{
          maxWidth: brandSpacing.maxWidth.full,
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
        }}
        className="why-inner"
      >
        <SectionHeader
          title={ctaCopy.whyChooseUs.title}
          subtitle={ctaCopy.whyChooseUs.subtitle}
        />
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(2, 1fr)",
            marginTop: "2rem",
          }}
          className="why-grid"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                borderRadius: brandRadii.card,
                background: "#FFFFFF",
                padding: "2rem 1.5rem",
                textAlign: "center",
                boxShadow: brandShadows.card,
                border: `1px solid ${brandColors.gold[100]}`,
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}
              className="why-feature-card"
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: brandColors.gold[50],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                  marginInline: "auto",
                  marginBottom: "1rem",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontFamily: brandTypography.fonts.heading,
                  fontSize: "1.125rem",
                  fontWeight: brandTypography.weights.bold,
                  color: brandColors.charcoal,
                  margin: 0,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: brandTypography.sizes.small,
                  color: "#6B7280",
                  lineHeight: brandTypography.lineHeights.relaxed,
                  fontFamily: brandTypography.fonts.body,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .why-section {
          padding-block: ${brandSpacing.section.mobile};
        }
        .why-feature-card:hover {
          box-shadow: ${brandShadows.cardHover};
          transform: translateY(-4px);
        }
        @media (min-width: 768px) {
          .why-section { padding-block: ${brandSpacing.section.tablet}; }
          .why-inner { padding-inline: ${brandSpacing.container.tablet} !important; }
        }
        @media (min-width: 1024px) {
          .why-section { padding-block: ${brandSpacing.section.desktop}; }
          .why-inner { padding-inline: ${brandSpacing.container.desktop} !important; }
          .why-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
