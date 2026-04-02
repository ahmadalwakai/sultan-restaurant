"use client";

import { IconButton, type IconButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

const FloatingActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function FloatingActionButton(props, ref) {
    return (
      <IconButton
        ref={ref}
        position="fixed"
        bottom="6"
        right="6"
        borderRadius="full"
        size="lg"
        bg="brand.500"
        color="white"
        shadow="lg"
        _hover={{ bg: "brand.600", transform: "scale(1.05)" }}
        zIndex="overlay"
        {...props}
      />
    );
  }
);

export default FloatingActionButton;
