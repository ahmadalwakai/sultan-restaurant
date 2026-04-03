"use client";

// ─── Audit Log Table ─────────────────────────────────────

import { Box, Card, Heading, Text, Table } from "@chakra-ui/react";

interface AuditEntry {
  id: string;
  adminEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  createdAt: string;
}

interface AuditLogTableProps {
  logs: AuditEntry[];
  isLoading?: boolean;
}

const actionColors: Record<string, { bg: string; color: string }> = {
  CREATE: { bg: "green.100", color: "green.800" },
  UPDATE: { bg: "blue.100", color: "blue.800" },
  DELETE: { bg: "red.100", color: "red.800" },
  LOGIN: { bg: "purple.100", color: "purple.800" },
  LOGOUT: { bg: "gray.100", color: "gray.800" },
  STATUS_CHANGE: { bg: "yellow.100", color: "yellow.800" },
  SETTINGS_UPDATE: { bg: "indigo.100", color: "indigo.800" },
  REFUND: { bg: "orange.100", color: "orange.800" },
};

export function AuditLogTable({ logs, isLoading }: AuditLogTableProps) {
  if (isLoading) {
    return (
      <Card.Root>
        <Card.Body p={6}>
          <Box h="5" w="28" bg="gray.100" rounded="md" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" mb={4} />
          {[...Array(5)].map((_, i) => (
            <Box key={i} h="10" bg="gray.50" rounded="md" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" mb={2} />
          ))}
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Card.Root overflow="hidden">
      <Box p={6} borderBottomWidth="1px">
        <Heading size="md" color="gray.900">Audit Log</Heading>
      </Box>
      {logs.length === 0 ? (
        <Text p={6} fontSize="sm" color="gray.500">No audit entries</Text>
      ) : (
        <Box overflowX="auto">
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row bg="gray.50">
                <Table.ColumnHeader textAlign="left" px={4} py={2} fontWeight="medium" color="gray.600">Admin</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="left" px={4} py={2} fontWeight="medium" color="gray.600">Action</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="left" px={4} py={2} fontWeight="medium" color="gray.600">Entity</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="left" px={4} py={2} fontWeight="medium" color="gray.600">Time</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {logs.map((log) => (
                <Table.Row key={log.id} _hover={{ bg: "gray.50" }}>
                  <Table.Cell px={4} py={2} color="gray.700">{log.adminEmail}</Table.Cell>
                  <Table.Cell px={4} py={2}>
                    <Box
                      as="span"
                      fontSize="xs"
                      fontWeight="medium"
                      px={2}
                      py={0.5}
                      rounded="md"
                      bg={actionColors[log.action]?.bg ?? "gray.100"}
                      color={actionColors[log.action]?.color}
                    >
                      {log.action}
                    </Box>
                  </Table.Cell>
                  <Table.Cell px={4} py={2} color="gray.700">
                    {log.entity}{log.entityId ? `/${log.entityId}` : ""}
                  </Table.Cell>
                  <Table.Cell px={4} py={2} color="gray.500">
                    {new Date(log.createdAt).toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}
    </Card.Root>
  );
}
