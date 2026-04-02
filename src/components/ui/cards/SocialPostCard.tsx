"use client";

import Image from "next/image";

interface SocialPostCardProps {
  post: {
    imageUrl: string;
    caption?: string;
    platform: "instagram" | "facebook" | "tiktok";
    permalink?: string;
  };
}

const platformIcons: Record<string, string> = {
  instagram: "📷",
  facebook: "📘",
  tiktok: "🎵",
};

export function SocialPostCard({ post }: SocialPostCardProps) {
  const Wrapper = post.permalink ? "a" : "div";
  const wrapperProps = post.permalink ? { href: post.permalink, target: "_blank" as const, rel: "noopener noreferrer" } : {};

  return (
    <Wrapper {...wrapperProps} className="group block overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="relative aspect-square">
        <Image src={post.imageUrl} alt={post.caption || "Social post"} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
          <span className="text-3xl">{platformIcons[post.platform] || "🔗"}</span>
        </div>
      </div>
      {post.caption && (
        <div className="p-3">
          <p className="text-xs text-gray-500 line-clamp-2">{post.caption}</p>
        </div>
      )}
    </Wrapper>
  );
}
