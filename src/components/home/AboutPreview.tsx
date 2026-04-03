import Link from "next/link";
import Image from "next/image";
import { SectionShell } from "@/components/shared/SectionShell";

export function AboutPreview() {
  return (
    <SectionShell>
        <div className="flex flex-col items-center gap-10 md:gap-16 lg:flex-row">
          <div className="w-full lg:w-5/12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1000&fit=crop&q=80"
                alt="Sultan Restaurant interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                unoptimized
              />
            </div>
          </div>
          <div className="flex-1 lg:w-7/12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">
              Est. 2012 &middot; Glasgow
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Our Story
            </h2>
            <p className="mt-2 text-lg text-gray-400">
              A taste of the Middle East in the heart of the city
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray-600">
              Sultan Restaurant brings together the finest flavours from Iraq, Lebanon, Syria, 
              and India. Our chefs use authentic recipes passed down through generations, combined 
              with the freshest locally sourced ingredients.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Whether you&apos;re craving a traditional mixed grill, creamy hummus, or aromatic 
              biryani, every dish is prepared with passion and served with warmth.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border-2 border-gray-900 px-7 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
            >
              Learn More About Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
    </SectionShell>
  );
}
