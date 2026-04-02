"use client";

import { Avatar } from "@chakra-ui/react";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  size?: "sm" | "md" | "lg";
}

export default function UserAvatar({ name, image, size = "md" }: UserAvatarProps) {
  return (
    <Avatar.Root size={size}>
      <Avatar.Image src={image || undefined} />
      <Avatar.Fallback>{name?.charAt(0)?.toUpperCase() || "?"}</Avatar.Fallback>
    </Avatar.Root>
  );
}
