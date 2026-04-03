import { Box } from "@chakra-ui/react";

export function ArabicPatternOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      opacity={opacity}
      backgroundImage="url('/images/patterns/arabic-geometric.svg')"
      backgroundSize="300px"
      backgroundRepeat="repeat"
    />
  );
}