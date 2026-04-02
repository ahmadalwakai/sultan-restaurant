import { SectionHeader } from "@/components/sections/SectionHeader";
import Image from "next/image";

export const metadata = { title: "Gallery | Sultan Restaurant" };

const galleryUrls = [
  "https://images.unsplash.com/photo-1540914124281-342587941389?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=600&fit=crop&q=80",
];

const images = galleryUrls.map((src, i) => ({
  src,
  alt: `Gallery image ${i + 1}`,
}));

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Gallery"
          subtitle="Take a visual tour of Sultan Restaurant"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
