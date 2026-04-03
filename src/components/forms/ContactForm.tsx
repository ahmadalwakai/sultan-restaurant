"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/validators";
import { useSubmitContact } from "@/hooks/api";
import toast from "react-hot-toast";
import { Box, Button, Input, SimpleGrid, Text, Textarea, VStack } from "@chakra-ui/react";

export function ContactForm() {
  const submitContact = useSubmitContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate(data, {
      onSuccess: () => {
        toast.success("Message sent! We'll get back to you soon.");
        reset();
      },
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} gap={4} align="stretch">
      <SimpleGrid gap={4} columns={{ base: 1, sm: 2 }}>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Name</Text>
          <Input {...register("name")} placeholder="Your name" size="md" />
          {errors.name && <Text mt={1} fontSize="xs" color="red.500">{errors.name.message}</Text>}
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Email</Text>
          <Input {...register("email")} type="email" placeholder="your@email.com" size="md" />
          {errors.email && <Text mt={1} fontSize="xs" color="red.500">{errors.email.message}</Text>}
        </Box>
      </SimpleGrid>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Phone (optional)</Text>
        <Input {...register("phone")} placeholder="07xxx xxx xxx" size="md" />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Subject</Text>
        <Input {...register("subject")} placeholder="What's this about?" size="md" />
        {errors.subject && <Text mt={1} fontSize="xs" color="red.500">{errors.subject.message}</Text>}
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium" color="gray.700">Message</Text>
        <Textarea {...register("message")} rows={5} placeholder="Your message..." size="md" />
        {errors.message && <Text mt={1} fontSize="xs" color="red.500">{errors.message.message}</Text>}
      </Box>

      <Button
        type="submit"
        disabled={submitContact.isPending}
        w="full"
        borderRadius="lg"
        bg="amber.500"
        py={3}
        fontWeight="semibold"
        color="white"
        _hover={{ bg: "amber.600" }}
        _disabled={{ opacity: 0.5 }}
      >
        {submitContact.isPending ? "Sending..." : "Send Message"}
      </Button>
    </VStack>
  );
}
