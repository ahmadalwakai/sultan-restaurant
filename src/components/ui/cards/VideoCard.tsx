"use client";

import Image from "next/image";
import { useState, useRef } from "react";

interface VideoCardProps {
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration?: string;
}

export function VideoCard({ title, thumbnailUrl, videoUrl, duration }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="relative aspect-video">
        {playing ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="h-full w-full object-cover"
            controls
            autoPlay
          />
        ) : (
          <>
            <Image src={thumbnailUrl} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <button
                onClick={handlePlay}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-amber-600 shadow-lg transition-transform group-hover:scale-110"
                aria-label="Play video"
              >
                <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </button>
            </div>
            {duration && (
              <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
                {duration}
              </span>
            )}
          </>
        )}
      </div>
      <div className="p-3">
        <p className="font-medium text-gray-900 line-clamp-1">{title}</p>
      </div>
    </div>
  );
}
