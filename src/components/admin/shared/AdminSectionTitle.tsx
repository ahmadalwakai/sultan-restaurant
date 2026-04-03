"use client";

import Link from "next/link";
import { HStack, VStack, Heading, Text, Button } from "@chakra-ui/react";

interface AdminSectionTitleProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

/** Page-level heading with optional primary action button */
export function AdminSectionTitle({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: AdminSectionTitleProps) {
  const actionButton = actionLabel ? (
    actionHref ? (
      <Button asChild size="sm" bg="yellow.500" color="white" _hover={{ bg: "yellow.600" }}>
        <Link href={actionHref}>+ {actionLabel}</Link>
      </Button>
    ) : onAction ? (
      <Button size="sm" bg="yellow.500" color="white" _hover={{ bg: "yellow.600" }} onClick={onAction}>
        + {actionLabel}
      </Button>
    ) : null
  ) : null;

  return (
    <HStack justify="space-between" align="center" mb={6} w="full">
      <VStack align="start" gap={0.5}>
        <Heading size="xl" color="gray.900" lineHeight={1.2}>
          {title}
        </Heading>
        {description && (
          <Text fontSize="sm" color="gray.500">
            {description}
          </Text>
        )}
      </VStack>
      {actionButton}
    </HStack>
  );
}
