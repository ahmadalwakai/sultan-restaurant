import { type ReactNode } from "react";
import { Card, Box } from "@chakra-ui/react";

interface AdminTableShellProps {
  children: ReactNode;
}

/** Table container with white background, border, and rounded corners */
export function AdminTableShell({ children }: AdminTableShellProps) {
  return (
    <Card.Root shadow="sm" borderRadius="xl" overflow="hidden">
      <Card.Body p={0}>
        <Box overflowX="auto">
          {children}
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
