"use client";

import { IconButton as ChakraIconButton, type IconButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    return (
      <ChakraIconButton
        ref={ref}
        variant="ghost"
        borderRadius="full"
        {...props}
      />
    );
  }
);

export default IconButton;
