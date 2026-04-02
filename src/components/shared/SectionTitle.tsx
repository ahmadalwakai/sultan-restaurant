import { Box, Heading, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionTitle({ title, subtitle, align = "center" }: Props) {
  return (
    <Box textAlign={align} mb={8}>
      <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" mb={2}>
        {title}
      </Heading>
      {subtitle && (
        <Text color="gray.600" fontSize={{ base: "sm", md: "md" }} maxW="2xl" mx={align === "center" ? "auto" : undefined}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
}
