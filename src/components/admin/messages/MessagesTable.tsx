"use client";

import { AdminTable } from "@/components/admin/shared/AdminTable";
import { Box } from "@chakra-ui/react";

interface Message { id: string; name: string; email: string; subject: string; isRead: boolean; createdAt: string }

export function MessagesTable({ messages, isLoading, onSelect }: { messages: Message[]; isLoading?: boolean; onSelect: (id: string) => void }) {
  return (
    <AdminTable
      data={messages}
      keyExtractor={(m) => m.id}
      isLoading={isLoading}
      columns={[
        { key: "status", header: "", width: "1rem", render: (m) => <Box as="span" display="inline-block" w={2} h={2} borderRadius="full" bg={m.isRead ? "gray.300" : "amber.500"} /> },
        { key: "from", header: "From", render: (m) => <Box as="button" onClick={() => onSelect(m.id)} textAlign="left" _hover={{ color: "amber.600" }} fontWeight={m.isRead ? "normal" : "semibold"}>{m.name}</Box> },
        { key: "subject", header: "Subject", render: (m) => <Box as="span" color={m.isRead ? "gray.500" : undefined}>{m.subject}</Box> },
        { key: "date", header: "Date", render: (m) => new Date(m.createdAt).toLocaleDateString() },
      ]}
    />
  );
}
