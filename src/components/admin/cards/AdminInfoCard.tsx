import { Card, Heading, Box } from "@chakra-ui/react";

interface AdminInfoCardProps {
  title: string;
  children: React.ReactNode;
}

/** Card with a title header and body content */
export function AdminInfoCard({ title, children }: AdminInfoCardProps) {
  return (
    <Card.Root shadow="sm" borderRadius="xl" overflow="hidden">
      <Box px={5} py={3.5} borderBottomWidth="1px" borderColor="gray.100">
        <Heading size="sm" color="gray.900">
          {title}
        </Heading>
      </Box>
      <Card.Body p={5}>
        {children}
      </Card.Body>
    </Card.Root>
  );
}
