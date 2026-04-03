"use client";

import { use } from "react";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import Link from "next/link";
import { Box, Container } from "@chakra-ui/react";

export default function CategoryMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <Box minH="screen" bg="gray.50">
      <Box bg="white" py={12}>
        <Container maxW="7xl" px={4}>
          <Link href="/menu" className="text-sm text-amber-600 hover:underline">
            &larr; Back to Menu
          </Link>
          <SectionHeader
            title={slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            subtitle=""
          />
        </Container>
      </Box>
      <Container maxW="7xl" px={4} py={8}>
        <MenuGrid params={{ categorySlug: slug }} />
      </Container>
    </Box>
  );
}
