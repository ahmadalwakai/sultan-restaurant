"use client";

import { Button, type ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

const OutlineButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function OutlineButton({ children, ...props }, ref) {
    return (
      <Button
        ref={ref}
        variant="outline"
        borderColor="gray.300"
        _hover={{ bg: "gray.50" }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export default OutlineButton;
