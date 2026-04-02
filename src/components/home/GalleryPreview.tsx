"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";

const previewImages = [
  "https://images.unsplash.com/photo-1540914124281-342587941389?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=600&fit=crop&q=80",
];

export function GalleryPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="A Glimpse of Sultan"
          subtitle="Step inside our world of flavour"
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {previewImages.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={img}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized
              />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/page/gallery"
            className="text-amber-600 font-semibold hover:underline"
          >
            View Full Gallery &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
