import { Flex, Text, Heading, Button } from "@chakra-ui/react";

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ title = "Something went wrong", message, onRetry }: Props) {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" py={20} gap={3}>
      <Heading as="h3" fontSize="lg" color="red.600">{title}</Heading>
      {message && <Text color="gray.500" textAlign="center">{message}</Text>}
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">Try Again</Button>
      )}
    </Flex>
  );
}
