"use client";

import Link from "next/link";

export function BookTableCTA() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-14 sm:py-20 lg:py-24">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)" }} />
      <div className="relative mx-auto max-w-[720px] px-5 sm:px-8 lg:px-12 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/70">
          Reservations
        </p>
        <h2 className="mt-3 font-heading text-2xl font-bold leading-tight sm:text-3xl">
          Join Us for an{" "}
          <span className="text-amber-400">Unforgettable</span> Evening
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
          Reserve your table and enjoy the warm ambiance,
          exceptional food, and outstanding service.
        </p>
        <Link
          href="/book"
          className="mt-7 inline-block rounded-lg bg-amber-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-amber-400"
          style={{ boxShadow: "0 4px 14px rgba(212,168,83,0.3)" }}
        >
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}
