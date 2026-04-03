import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";

export default function RootLoading() {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <VStack gap={4}>
        <Spinner size="lg" color="orange.500" borderWidth="4px" />
        <Text color="gray.500" fontSize="sm">Loading...</Text>
      </VStack>
    </Flex>
  );
}
