"use client";

import { Input, InputGroup } from "@chakra-ui/react";
import { forwardRef } from "react";

interface SearchInputProps extends React.ComponentProps<typeof Input> {
  onSearch?: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ onSearch, ...props }, ref) {
    return (
      <InputGroup w="full" maxW="md">
        <Input
          ref={ref}
          placeholder="Search..."
          borderColor="gray.300"
          _focus={{ borderColor: "brand.500" }}
          onChange={(e) => onSearch?.(e.target.value)}
          {...props}
        />
      </InputGroup>
    );
  }
);

export default SearchInput;
