"use client";

import { Box } from "@chakra-ui/react";

export default function ContactMap() {
  return (
    <Box borderRadius="xl" overflow="hidden" h="400px" bg="gray.100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0!2d-0.1!3d51.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzAwLjAiTiAwwrAwNicwMC4wIlc!5e0!3m2!1sen!2suk!4v1"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Sultan Restaurant location"
      />
    </Box>
  );
}
