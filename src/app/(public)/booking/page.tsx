import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { brandColors, brandRadii, brandShadows, brandSpacing } from "@/theme/branding";

export const metadata = { title: "Booking | Sultan Restaurant" };

export default function BookingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: brandColors.surface.light,
        paddingTop: brandSpacing.section.mobile,
        paddingBottom: brandSpacing.section.mobile,
      }}
    >
      <div style={{ maxWidth: "42rem", marginInline: "auto", padding: `0 ${brandSpacing.container.mobile}` }}>
        <SectionHeader
          title="Table Reservation"
          subtitle="Choose your preferred date and time"
        />
        <div
          style={{
            marginTop: "2rem",
            borderRadius: brandRadii["2xl"],
            background: "#FFFFFF",
            padding: "1.5rem",
            boxShadow: brandShadows.cardHover,
          }}
        >
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
