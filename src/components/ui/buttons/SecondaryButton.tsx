"use client";

import { Button, type ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function SecondaryButton({ children, ...props }, ref) {
    return (
      <Button
        ref={ref}
        bg="transparent"
        color="brand.500"
        border="1px solid"
        borderColor="brand.500"
        _hover={{ bg: "brand.50" }}
        fontWeight="semibold"
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export default SecondaryButton;
