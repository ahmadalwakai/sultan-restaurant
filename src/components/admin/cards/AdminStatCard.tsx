import { Card, HStack, VStack, Text, Box } from "@chakra-ui/react";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: { value: string; positive: boolean };
}

/** Dashboard KPI card with icon, value, label, and optional trend */
export function AdminStatCard({ label, value, icon, trend }: AdminStatCardProps) {
  return (
    <Card.Root shadow="sm" borderRadius="xl" _hover={{ shadow: "md", transform: "translateY(-1px)" }} transition="all 0.2s">
      <Card.Body p={5}>
        <HStack justify="space-between" align="flex-start">
          <VStack align="start" gap={1}>
            <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide">
              {label}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="gray.900">
              {value}
            </Text>
            {trend && (
              <Text fontSize="xs" fontWeight="medium" color={trend.positive ? "green.600" : "red.600"}>
                {trend.positive ? "↑" : "↓"} {trend.value}
              </Text>
            )}
          </VStack>
          {icon && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w={11}
              h={11}
              borderRadius="lg"
              bg="yellow.50"
              fontSize="xl"
              flexShrink={0}
            >
              {icon}
            </Box>
          )}
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
