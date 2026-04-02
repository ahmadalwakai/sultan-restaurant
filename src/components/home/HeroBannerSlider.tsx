"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80",
    title: "Authentic Middle Eastern Cuisine",
    subtitle: "Experience the rich flavours of Syria, Lebanon & Iraq",
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80",
    title: "Fresh Ingredients Daily",
    subtitle: "Prepared with love and authentic spices",
  },
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
    title: "Dine In or Take Away",
    subtitle: "Enjoy our food your way",
  },
];

export function HeroBannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}
      <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
        <div>
          <h1 className="font-heading text-5xl font-bold md:text-6xl">
            {slides[current].title}
          </h1>
          <p className="mt-4 text-xl text-gray-200">{slides[current].subtitle}</p>
          <Link
            href="/menu"
            className="mt-8 inline-block rounded-lg bg-amber-500 px-8 py-3.5 text-lg font-semibold transition-colors hover:bg-amber-600"
          >
            Explore Menu
          </Link>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-amber-500" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
