"use client";

import Link from "next/link";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function AdminPageHeader({ title, description, actionLabel, actionHref, onAction }: AdminPageHeaderProps) {
  return (
    <Flex align="center" justify="space-between" mb={6}>
      <Box>
        <Heading as="h1" fontSize="2xl" fontWeight="bold" color="gray.900">{title}</Heading>
        {description && <Text mt={1} fontSize="sm" color="gray.500">{description}</Text>}
      </Box>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button size="sm" bg="orange.600" color="white" _hover={{ bg: "orange.700" }}>
            + {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button onClick={onAction} size="sm" bg="orange.600" color="white" _hover={{ bg: "orange.700" }}>
          {actionLabel}
        </Button>
      )}
    </Flex>
  );
}
