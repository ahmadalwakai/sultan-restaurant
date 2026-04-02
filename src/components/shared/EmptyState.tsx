import { Flex, Text, Heading } from "@chakra-ui/react";

type Props = {
  title?: string;
  message?: string; // alias for title
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, message, description, action }: Props) {
  const displayTitle = title || message || "No items found";
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" py={20} gap={3}>
      <Heading as="h3" fontSize="lg" color="gray.700">{displayTitle}</Heading>
      {description && <Text color="gray.500" textAlign="center">{description}</Text>}
      {action}
    </Flex>
  );
}
