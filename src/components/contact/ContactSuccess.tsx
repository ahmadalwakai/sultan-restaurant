"use client";

import { VStack, Heading, Text, Button } from "@chakra-ui/react";

interface ContactSuccessProps {
  onReset: () => void;
}

export default function ContactSuccess({ onReset }: ContactSuccessProps) {
  return (
    <VStack py={12} gap={4} textAlign="center">
      <Text fontSize="5xl">✉️</Text>
      <Heading as="h2" fontSize="2xl" fontFamily="var(--font-heading)">Message Sent!</Heading>
      <Text color="gray.600">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</Text>
      <Button variant="outline" onClick={onReset}>Send Another Message</Button>
    </VStack>
  );
}
