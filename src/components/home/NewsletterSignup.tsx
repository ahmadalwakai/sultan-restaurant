"use client";

import { useState } from "react";
import { Box, Container, VStack, Heading, Text, Flex, Input, Button } from "@chakra-ui/react";
import { FadeInUp } from "@/components/animation";
import { ArabicPatternOverlay } from "@/components/decorative/ArabicPattern";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box as="section" py={{ base: 8, md: 10 }} bg="bg.elevated" color="text.on-dark" position="relative" overflow="hidden">
      <ArabicPatternOverlay opacity={0.02} />
      <Container maxW="3xl" px={{ base: 4, md: 6, lg: 8 }} position="relative" zIndex={1}>
        <VStack gap={4} textAlign="center">
          <FadeInUp>
            <Heading as="h2" fontFamily="heading" fontSize={{ base: "xl", sm: "2xl" }} fontWeight="bold">
              Stay Updated
            </Heading>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Text mt={2} fontSize="sm" opacity={0.8}>
              Subscribe for exclusive offers and updates
            </Text>
          </FadeInUp>
          {submitted ? (
            <FadeInUp delay={0.4}>
              <Text mt={6} fontSize="sm" fontWeight="medium" color="amber.400">
                Thank you for subscribing!
              </Text>
            </FadeInUp>
          ) : (
            <FadeInUp delay={0.4}>
              <Flex as="form" onSubmit={handleSubmit} mt={6} direction={{ base: "column", sm: "row" }} gap={3}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  flex={1}
                  borderRadius="lg"
                  borderColor="gray.300"
                  bg="white"
                  px={4}
                  py={3}
                  fontSize="sm"
                  color="gray.900"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{ borderColor: "amber.500", ring: "1px", ringColor: "amber.500" }}
                />
                <Button
                  type="submit"
                  borderRadius="lg"
                  bg="gray.900"
                  px={6}
                  py={3}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="white"
                  _hover={{ bg: "gray.800" }}
                >
                  Subscribe
                </Button>
              </Flex>
            </FadeInUp>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
