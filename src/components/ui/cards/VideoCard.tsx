"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Box, Flex, Text, chakra } from "@chakra-ui/react";

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
    <Box overflow="hidden" borderRadius="xl" bg="white" shadow="sm" role="group">
      <Box position="relative" css={{ aspectRatio: "16/9" }}>
        {playing ? (
          <video
            ref={videoRef}
            src={videoUrl}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            controls
            autoPlay
          />
        ) : (
          <>
            <Image src={thumbnailUrl} alt={title} fill objectFit="cover" />
            <Flex position="absolute" inset={0} align="center" justify="center" bg="blackAlpha.200" transition="background 0.2s" _groupHover={{ bg: "blackAlpha.300" }}>
              <chakra.button
                type="button"
                onClick={handlePlay}
                h={14}
                w={14}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                bg="whiteAlpha.900"
                color="orange.600"
                shadow="lg"
                transition="transform 0.2s"
                _groupHover={{ transform: "scale(1.1)" }}
                aria-label="Play video"
              >
                <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </chakra.button>
            </Flex>
            {duration && (
              <Text as="span" position="absolute" bottom={2} right={2} borderRadius="md" bg="blackAlpha.700" px={2} py={0.5} fontSize="xs" fontWeight="medium" color="white">
                {duration}
              </Text>
            )}
          </>
        )}
      </Box>
      <Box p={3}>
        <Text fontWeight="medium" color="gray.900" lineClamp={1}>{title}</Text>
      </Box>
    </Box>
  );
}
