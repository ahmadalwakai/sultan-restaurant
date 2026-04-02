"use client";

import { SITE_CONFIG } from "@/lib/constants/site";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function ContactSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          title="Get in Touch"
          subtitle="We'd love to hear from you"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
              📍
            </div>
            <h3 className="font-heading text-lg font-bold">Visit Us</h3>
            <p className="mt-2 text-sm text-gray-500">{SITE_CONFIG.contact.address}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
              📞
            </div>
            <h3 className="font-heading text-lg font-bold">Call Us</h3>
            <p className="mt-2 text-sm text-gray-500">{SITE_CONFIG.contact.phone}</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-md text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
              ✉️
            </div>
            <h3 className="font-heading text-lg font-bold">Email Us</h3>
            <p className="mt-2 text-sm text-gray-500">{SITE_CONFIG.contact.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
