"use client";

import Image from "next/image";
import { useInstagramFeed } from "@/hooks/api";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { Box, Container, Flex, SimpleGrid, chakra } from "@chakra-ui/react";

export function InstagramFeed() {
  const { data: posts, isLoading } = useInstagramFeed(6);

  if (isLoading) return <LoadingState message="Loading Instagram feed..." />;
  if (!posts || posts.length === 0) return null;

  return (
    <Box as="section" py={20}>
      <Container maxW="7xl" px={4}>
        <SectionHeader
          title="Follow Us on Instagram"
          subtitle="@sultanrestaurant — Fresh photos from our kitchen daily"
        />
        <SimpleGrid columns={{ base: 2, sm: 3, lg: 6 }} gap={3} mt={10}>
          {posts.map((post) => (
            <chakra.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              position="relative"
              css={{ aspectRatio: "1" }}
              overflow="hidden"
              borderRadius="xl"
              role="group"
            >
              <Image
                src={post.thumbnailUrl || post.mediaUrl}
                alt={post.caption?.slice(0, 100) || "Instagram post"}
                fill
                className="object-cover"
              />
              <Box position="absolute" inset={0} transition="background 0.2s" _groupHover={{ bg: "blackAlpha.400" }} />
              <Flex position="absolute" inset={0} align="center" justify="center" opacity={0} transition="opacity 0.2s" _groupHover={{ opacity: 1 }}>
                <svg height="32" width="32" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Flex>
              {post.mediaType === "VIDEO" && (
                <Box position="absolute" left={2} top={2} borderRadius="md" bg="blackAlpha.600" p={1}>
                  <svg height="16" width="16" fill="white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Box>
              )}
            </chakra.a>
          ))}
        </SimpleGrid>
        <Box mt={8} textAlign="center">
          <chakra.a
            href="https://instagram.com/sultanrestaurant"
            target="_blank"
            rel="noopener noreferrer"
            display="inline-flex"
            alignItems="center"
            gap={2}
            borderRadius="lg"
            borderWidth="2px"
            borderColor="pink.500"
            px={6}
            py={3}
            fontWeight={600}
            color="pink.600"
            transition="all 0.2s"
            _hover={{ bg: "pink.500", color: "white" }}
          >
            <svg height="20" width="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Follow @sultanrestaurant
          </chakra.a>
        </Box>
      </Container>
    </Box>
  );
}
