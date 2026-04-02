"use client";

import Link from "next/link";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
}

export function CTABanner({ title, subtitle, buttonText, buttonHref }: CTABannerProps) {
  return (
    <section className="bg-amber-500 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center text-white">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-lg text-white/90">{subtitle}</p>}
        <Link
          href={buttonHref}
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3.5 text-lg font-semibold text-amber-600 transition-colors hover:bg-gray-100"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
