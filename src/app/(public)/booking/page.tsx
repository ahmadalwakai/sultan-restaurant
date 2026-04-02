import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeader } from "@/components/sections/SectionHeader";

export const metadata = { title: "Booking | Sultan Restaurant" };

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-2xl px-4">
        <SectionHeader
          title="Table Reservation"
          subtitle="Choose your preferred date and time"
        />
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
