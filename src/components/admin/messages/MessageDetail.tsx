"use client";

import { Card, Flex, Box, Text, Button } from "@chakra-ui/react";

interface MessageDetailProps {
  message: { id: string; name: string; email: string; phone?: string | null; subject: string; message: string; createdAt: string };
  onDelete: (id: string) => void;
}

export function MessageDetail({ message, onDelete }: MessageDetailProps) {
  return (
    <Card.Root bg="bg.surface" borderRadius="lg">
      <Card.Body p={6}>
        <Flex justify="space-between" align="flex-start" mb={4}>
          <Box>
            <Text fontWeight="semibold" fontSize="lg">{message.subject}</Text>
            <Text fontSize="sm" color="gray.500">From {message.name} &lt;{message.email}&gt;</Text>
            {message.phone && <Text fontSize="sm" color="gray.400">{message.phone}</Text>}
            <Text fontSize="xs" color="gray.400" mt={1}>{new Date(message.createdAt).toLocaleString()}</Text>
          </Box>
          <Button size="sm" variant="ghost" color="red.600" onClick={() => onDelete(message.id)}>Delete</Button>
        </Flex>
        <Box borderTop="1px solid" borderColor="gray.200" pt={4} fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
          {message.message}
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
