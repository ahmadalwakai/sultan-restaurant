"use client";

import { Box, Button, Card, Flex, Heading, Text } from "@chakra-ui/react";

interface EmailLogDetailProps {
  log: { id: string; to: string; subject: string; body: string; status: string; sentAt: string; error?: string | null };
  onResend: (id: string) => void;
}

export function EmailLogDetail({ log, onResend }: EmailLogDetailProps) {
  return (
    <Card.Root>
      <Card.Body p={6}>
        <Flex justify="space-between" align="flex-start">
          <Box>
            <Heading size="md">{log.subject}</Heading>
            <Text fontSize="sm" color="gray.500">To: {log.to}</Text>
            <Text fontSize="xs" color="gray.400">{new Date(log.sentAt).toLocaleString()}</Text>
          </Box>
          <Flex gap={2} align="center">
            <Box
              as="span"
              fontSize="xs"
              px={2}
              py={1}
              rounded="md"
              fontWeight="medium"
              bg={log.status === "SENT" ? "green.100" : "red.100"}
              color={log.status === "SENT" ? "green.700" : "red.700"}
            >
              {log.status}
            </Box>
            <Button variant="ghost" size="sm" color="amber.600" onClick={() => onResend(log.id)}>Resend</Button>
          </Flex>
        </Flex>
        {log.error && <Box bg="red.50" borderWidth="1px" borderColor="red.200" rounded="md" p={3} fontSize="sm" color="red.700" mt={4}>{log.error}</Box>}
        <Box borderTopWidth="1px" pt={4} mt={4} fontSize="sm" color="gray.700" whiteSpace="pre-wrap">{log.body}</Box>
      </Card.Body>
    </Card.Root>
  );
}
