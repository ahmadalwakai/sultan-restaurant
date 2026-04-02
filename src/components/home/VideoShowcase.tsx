"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-gray-900 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Behind the Scenes"
          subtitle="Watch our chefs craft your favourite dishes"
          className="text-white [&_h2]:text-white [&_p]:text-gray-300"
        />
        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative aspect-video bg-gray-800">
              {isPlaying ? (
                <video
                  src="/videos/kitchen.mp4"
                  autoPlay
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                    <div className="text-center text-white">
                      <div className="text-6xl">🎥</div>
                      <p className="mt-4 text-lg font-medium">Our Kitchen in Action</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
                    aria-label="Play video"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-transform hover:scale-110">
                      <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
