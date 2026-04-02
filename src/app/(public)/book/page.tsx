import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SITE_CONFIG } from "@/lib/constants/site";
import { brandColors, brandRadii, brandShadows, brandSpacing, brandTypography } from "@/theme/branding";

export const metadata = { title: "Book a Table | Sultan Restaurant" };

export default function BookPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: brandColors.surface.light,
        paddingBlock: brandSpacing.section.mobile,
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
        }}
      >
        <SectionHeader
          title="Reserve Your Table"
          subtitle="Book a table at Sultan Restaurant for a memorable dining experience"
        />
        <div
          style={{
            marginTop: "2rem",
            borderRadius: brandRadii["2xl"],
            background: "#FFFFFF",
            padding: "2rem",
            boxShadow: brandShadows.cardHover,
          }}
        >
          <BookingForm />
        </div>
        <p
          style={{
            marginTop: "2rem",
            textAlign: "center",
            fontSize: brandTypography.sizes.small,
            color: "#6B7280",
            fontFamily: brandTypography.fonts.body,
          }}
        >
          Or call us directly:{" "}
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            style={{ color: brandColors.gold[600], fontWeight: brandTypography.weights.semibold }}
          >
            {SITE_CONFIG.contact.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
