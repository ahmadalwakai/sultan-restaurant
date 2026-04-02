"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Box } from "@chakra-ui/react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({ fallbackSrc = "/images/placeholders/default.jpg", src, alt, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  if (hasError && !fallbackSrc) {
    return <Box bg="gray.100" w="full" h="full" />;
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (!hasError) {
          setImgSrc(fallbackSrc);
          setHasError(true);
        }
      }}
    />
  );
}
