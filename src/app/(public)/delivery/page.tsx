import { SectionHeader } from "@/components/sections/SectionHeader";
import { DeliveryPartnersSection } from "@/components/home/DeliveryPartnersSection";
import Link from "next/link";

export const metadata = {
  title: "Delivery",
  description:
    "Sultan Restaurant delivery via Uber Eats, Deliveroo & Just Eat. Or order online for collection from 577 Gallowgate, Glasgow.",
};

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <SectionHeader
            title="Delivery & Collection"
            subtitle="Enjoy Sultan at home or collect from our restaurant"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white">
              <h3 className="text-2xl font-bold">Collection</h3>
              <p className="mt-3 text-white/90">
                Order online and collect from our restaurant. Ready in 30 minutes.
              </p>
              <Link
                href="/pickup"
                className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-amber-600 hover:bg-gray-100"
              >
                Order for Pickup
              </Link>
            </div>
            <div className="rounded-2xl bg-gray-900 p-8 text-white">
              <h3 className="text-2xl font-bold">Delivery</h3>
              <p className="mt-3 text-gray-300">
                Order through our delivery partners for doorstep delivery.
              </p>
              <div className="mt-6 text-sm text-gray-400">
                Available on Uber Eats, Deliveroo & Just Eat
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeliveryPartnersSection />
    </div>
  );
}
