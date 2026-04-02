"use client";

import Link from "next/link";

export function BookTableCTA() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-20">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)" }} />
      <div className="relative mx-auto max-w-3xl px-4 text-center text-white">
        <h2 className="font-heading text-4xl font-bold">
          Join Us for an{" "}
          <span className="text-amber-400">Unforgettable</span> Evening
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Reserve your table and enjoy the warm ambiance,
          exceptional food, and outstanding service.
        </p>
        <Link
          href="/book"
          className="mt-8 inline-block rounded-lg bg-amber-500 px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-amber-600 hover:shadow-lg"
        >
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}
