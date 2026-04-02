import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata = { title: "Book a Table | Sultan Restaurant" };

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-2xl px-4">
        <SectionHeader
          title="Reserve Your Table"
          subtitle="Book a table at Sultan Restaurant for a memorable dining experience"
        />
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <BookingForm />
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Or call us directly: {SITE_CONFIG.contact.phone}</p>
        </div>
      </div>
    </div>
  );
}
