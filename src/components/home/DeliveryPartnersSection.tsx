"use client";

import { Box, Container, VStack, Flex, Text } from "@chakra-ui/react";

const partners = [
  { name: "Uber Eats", color: "#06C167" },
  { name: "Deliveroo", color: "#00CCBC" },
  { name: "Just Eat", color: "#F36D00" },
];

export function DeliveryPartnersSection() {
  return (
    <Box as="section" py={{ base: 8, md: 10 }} bg="bg.canvas" borderTopWidth="1px" borderColor="gray.100">
      <Container maxW="3xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={5}>
          <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="widest" color="gray.400" textAlign="center">
            Also available on
          </Text>
          <Flex gap={{ base: 8, sm: 12 }} align="center" justify="center">
            {partners.map((partner) => (
              <Text
                key={partner.name}
                fontSize={{ base: "md", sm: "lg" }}
                fontWeight="bold"
                style={{ color: partner.color }}
              >
                {partner.name}
              </Text>
            ))}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
