import { Flex, Spinner, Text } from "@chakra-ui/react";

type Props = {
  message?: string;
};

export function LoadingState({ message = "Loading..." }: Props) {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" py={20} gap={4}>
      <Spinner size="lg" color="brand.500" />
      <Text color="gray.500">{message}</Text>
    </Flex>
  );
}
