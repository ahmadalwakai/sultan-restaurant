"use client";

import Link from "next/link";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function BookingSection() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-20 text-white">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)" }} />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <SectionTitle
          title="Reserve Your Table"
          subtitle="Enjoy an unforgettable dining experience with family and friends"
        />
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/book"
            className="rounded-lg bg-amber-500 px-8 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-amber-600"
          >
            Book a Table
          </Link>
          <a
            href="tel:+441onal234567"
            className="rounded-lg border-2 border-amber-500 px-8 py-3.5 text-lg font-semibold text-amber-400 transition-colors hover:bg-amber-500 hover:text-white"
          >
            Call Us
          </a>
        </div>
        <p className="mt-6 text-gray-400">
          Open daily from 11:00 AM to 11:00 PM
        </p>
      </div>
    </section>
  );
}
