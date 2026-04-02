"use client";

import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <Button
      onClick={() => signIn("google")}
      w="full"
      variant="outline"
      borderColor="gray.300"
      _hover={{ bg: "gray.50" }}
    >
      Continue with Google
    </Button>
  );
}
