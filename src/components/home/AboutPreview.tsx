import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function AboutPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="relative w-full md:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80"
                alt="Sultan Restaurant interior"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-xl bg-amber-500 p-4 text-white shadow-lg">
              <span className="text-3xl font-bold">12+</span>
              <span className="ml-1 text-sm">Years</span>
            </div>
          </div>
          <div className="flex-1">
            <SectionHeader
              title="Our Story"
              subtitle="A taste of the Middle East in the heart of the city"
            />
            <p className="mt-6 text-gray-600 leading-relaxed">
              Sultan Restaurant brings together the finest flavours from Iraq, Lebanon, Syria, 
              and India. Our chefs use authentic recipes passed down through generations, combined 
              with the freshest locally sourced ingredients.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Whether you&apos;re craving a traditional mixed grill, creamy hummus, or aromatic 
              biryani, every dish is prepared with passion and served with warmth.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-lg bg-amber-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
