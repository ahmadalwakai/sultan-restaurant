"use client";

import Link from "next/link";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

export function PickupCTA() {
  return (
    <Box as="section" py={{ base: 8, md: 10 }} bg="bg.canvas" borderTopWidth="1px" borderColor="orange.100">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex direction={{ base: "column", sm: "row" }} align="center" justify={{ sm: "space-between" }} gap={{ base: 4, sm: 6 }}>
          <Box textAlign={{ base: "center", sm: "left" }}>
            <Heading as="h2" fontFamily="heading" fontSize={{ base: "lg", sm: "xl" }} fontWeight="bold" color="gray.900">
              Order for Collection
            </Heading>
            <Text mt={1} fontSize="sm" color="gray.500">
              Skip the queue — order online, collect in 30 minutes.
            </Text>
          </Box>
          <Link href="/pickup">
            <Box
              flexShrink={0}
              borderRadius="lg"
              bg="amber.600"
              px={7}
              py={2.5}
              fontSize="sm"
              fontWeight="semibold"
              color="white"
              transition="colors 0.2s"
              _hover={{ bg: "amber.700" }}
            >
              Order Now
            </Box>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
