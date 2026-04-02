"use client";

import Image from "next/image";
import Link from "next/link";

interface LocationAreaCardProps {
  area: {
    name: string;
    image: string;
    deliveryTime: string;
    deliveryFee?: string;
  };
}

export function LocationAreaCard({ area }: LocationAreaCardProps) {
  return (
    <Link href="/delivery" className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-28">
        <Image src={area.image} alt={area.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <p className="absolute bottom-2 left-3 font-semibold text-white">{area.name}</p>
      </div>
      <div className="flex items-center justify-between p-3">
        <span className="text-sm text-gray-600">🕐 {area.deliveryTime}</span>
        {area.deliveryFee && <span className="text-sm font-medium text-amber-600">{area.deliveryFee}</span>}
      </div>
    </Link>
  );
}
