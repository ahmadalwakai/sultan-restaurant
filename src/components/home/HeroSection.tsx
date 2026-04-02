"use client";

import Link from "next/link";
import Image from "next/image";

const HERO_BG = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <Image
        src={HERO_BG}
        alt="Sultan Restaurant ambiance"
        fill
        className="object-cover"
        priority
        sizes="100vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
            Welcome to Sultan
          </p>
          <h1 className="mt-4 font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Authentic Flavours,{" "}
            <span className="text-amber-400">Unforgettable</span>{" "}
            Experience
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Discover the finest Indian and Bangladeshi cuisine, crafted with
            love and served with passion in the heart of the city.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="rounded-lg bg-amber-500 px-8 py-3.5 text-lg font-semibold text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl"
            >
              Order Now
            </Link>
            <Link
              href="/book"
              className="rounded-lg border-2 border-white/30 px-8 py-3.5 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
