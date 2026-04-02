"use client";

import { Box, type BoxProps } from "@chakra-ui/react";
import { forwardRef } from "react";

const BaseCard = forwardRef<HTMLDivElement, BoxProps>(
  function BaseCard({ children, ...props }, ref) {
    return (
      <Box
        ref={ref}
        bg="white"
        borderRadius="xl"
        shadow="sm"
        border="1px solid"
        borderColor="gray.100"
        overflow="hidden"
        {...props}
      >
        {children}
      </Box>
    );
  }
);

export default BaseCard;
