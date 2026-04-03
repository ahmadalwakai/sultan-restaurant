"use client";

import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";

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
    <Box as={Wrapper} {...wrapperProps} role="group" display="block" overflow="hidden" borderRadius="xl" bg="bg.surface" shadow="sm">
      <Box position="relative" aspectRatio="1/1">
        <Image src={post.imageUrl} alt={post.caption || "Social post"} fill className="object-cover" />
        <Flex position="absolute" inset={0} align="center" justify="center" bg="transparent" opacity={0} transition="all 0.3s" _groupHover={{ bg: "blackAlpha.300", opacity: 1 }}>
          <Text fontSize="3xl">{platformIcons[post.platform] || "🔗"}</Text>
        </Flex>
      </Box>
      {post.caption && (
        <Box p={3}>
          <Text fontSize="xs" color="gray.500" lineClamp={2}>{post.caption}</Text>
        </Box>
      )}
    </Box>
  );
}
