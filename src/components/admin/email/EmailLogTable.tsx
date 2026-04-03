"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface EmailLog { id: string; to: string; subject: string; status: string; sentAt: string }

export function EmailLogTable({ logs, isLoading, onSelect }: { logs: EmailLog[]; isLoading?: boolean; onSelect: (id: string) => void }) {
  return (
    <AdminTable
      data={logs}
      keyExtractor={(l) => l.id}
      isLoading={isLoading}
      columns={[
        { key: "to", header: "To", render: (l) => <Button variant="ghost" size="sm" color="amber.600" onClick={() => onSelect(l.id)}>{l.to}</Button> },
        { key: "subject", header: "Subject", render: (l) => l.subject },
        { key: "status", header: "Status", render: (l) => {
          const colors = l.status === "SENT" ? { bg: "green.100", color: "green.700" } : l.status === "FAILED" ? { bg: "red.100", color: "red.700" } : { bg: "yellow.100", color: "yellow.700" };
          return <Box as="span" fontSize="xs" px={2} py={1} rounded="md" fontWeight="medium" bg={colors.bg} color={colors.color}>{l.status}</Box>;
        }},
        { key: "date", header: "Sent At", render: (l) => new Date(l.sentAt).toLocaleString() },
      ]}
    />
  );
}
