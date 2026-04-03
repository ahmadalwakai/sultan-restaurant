"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionShell } from "@/components/shared/SectionShell";
import { usePopularMenu } from "@/hooks/api";

export function GalleryPreview() {
  const { data: items } = usePopularMenu();

  const galleryItems = (items ?? [])
    .filter((item) => item.image)
    .slice(0, 4);

  if (galleryItems.length === 0) return null;

  return (
    <SectionShell bg="bg-stone-50">
      <SectionHeader
        title="A Glimpse of Sultan"
        subtitle="Step inside our world of flavour"
      />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {galleryItems.map((item) => (
          <Link
            key={item.id}
            href={`/menu?highlight=${item.slug}`}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={item.image!}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/menu"
          className="text-sm font-semibold text-gray-500 transition-colors hover:text-amber-600"
        >
          Explore Full Menu &rarr;
        </Link>
      </div>
    </SectionShell>
  );
}
