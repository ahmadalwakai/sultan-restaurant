"use client";

import { Box, Button, VStack, Input, Textarea, Field, Heading } from "@chakra-ui/react";
import { useState } from "react";

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; subject: string; message: string }) => Promise<void>;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ name, email, subject, message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Heading as="h2" fontSize="2xl" fontFamily="var(--font-heading)" mb={6}>Get in Touch</Heading>
      <VStack gap={4}>
        <Field.Root><Field.Label>Name</Field.Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></Field.Root>
        <Field.Root><Field.Label>Email</Field.Label><Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required /></Field.Root>
        <Field.Root><Field.Label>Subject</Field.Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} required /></Field.Root>
        <Field.Root><Field.Label>Message</Field.Label><Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required /></Field.Root>
        <Button type="submit" colorPalette="brand" w="full" loading={loading}>Send Message</Button>
      </VStack>
    </Box>
  );
}
