"use client";

import Link from "next/link";
import { Card, HStack, VStack, Text, Box } from "@chakra-ui/react";

interface AdminActionCardProps {
  icon: string;
  title: string;
  description?: string;
  href: string;
}

/** Quick-action card linking to an admin page */
export function AdminActionCard({ icon, title, description, href }: AdminActionCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Card.Root
        shadow="sm"
        borderRadius="xl"
        cursor="pointer"
        _hover={{ shadow: "md", transform: "translateY(-1px)" }}
        transition="all 0.2s"
      >
        <Card.Body p={4}>
          <HStack gap={3}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w={10}
              h={10}
              borderRadius="lg"
              bg="yellow.50"
              fontSize="lg"
              flexShrink={0}
            >
              {icon}
            </Box>
            <VStack align="start" gap={0.5}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                {title}
              </Text>
              {description && (
                <Text fontSize="xs" color="gray.400">
                  {description}
                </Text>
              )}
            </VStack>
          </HStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}
