"use client";

import { Button, type ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function PrimaryButton({ children, ...props }, ref) {
    return (
      <Button
        ref={ref}
        bg="brand.500"
        color="white"
        _hover={{ bg: "brand.600" }}
        _active={{ bg: "brand.700" }}
        fontWeight="semibold"
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export default PrimaryButton;
