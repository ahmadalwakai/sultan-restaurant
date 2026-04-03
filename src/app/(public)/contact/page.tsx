import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sultan Restaurant. Call +44 141 391 8883, email info@sultanrestaurant.co.uk, or visit us at 577 Gallowgate, Glasgow G40 2PE.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Get in Touch"
          subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
            <ContactForm />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="font-heading text-lg font-bold">Address</h3>
              <p className="mt-2 text-gray-600">{SITE_CONFIG.contact.address}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="font-heading text-lg font-bold">Phone</h3>
              <p className="mt-2 text-gray-600">{SITE_CONFIG.contact.phone}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="font-heading text-lg font-bold">Email</h3>
              <p className="mt-2 text-gray-600">{SITE_CONFIG.contact.email}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="font-heading text-lg font-bold">Opening Hours</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>Mon–Thu: 12:00 PM – 10:00 PM</p>
                <p>Fri–Sat: 12:00 PM – 11:00 PM</p>
                <p>Sun: 1:00 PM – 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
