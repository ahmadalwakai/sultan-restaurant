"use client";

import { Box, Container, VStack, Flex, Text } from "@chakra-ui/react";
import { FadeInUp } from "@/components/animation";

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
          <FadeInUp>
            <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="widest" color="gray.400" textAlign="center">
              Also available on
            </Text>
          </FadeInUp>
          <FadeInUp delay={0.2}>
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
          </FadeInUp>
        </VStack>
      </Container>
    </Box>
  );
}
