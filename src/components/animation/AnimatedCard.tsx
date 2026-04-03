"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

export function AnimatedCard({ children }: { children: ReactNode }) {
  return (
    <Box role="group">
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ borderRadius: "16px", overflow: "hidden", position: "relative" }}
      >
        <Box
          position="absolute"
          top={0}
          left="50%"
          transform="translateX(-50%)"
          w="0"
          h="3px"
          bg="brand.primary"
          borderRadius="full"
          transition="width 0.3s ease"
          _groupHover={{ w: "60%" }}
        />
        {children}
      </motion.div>
    </Box>
  );
}