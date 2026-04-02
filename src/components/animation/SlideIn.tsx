"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
};

export function SlideIn({ children, direction = "left", delay = 0 }: Props) {
  const x = direction === "left" ? -30 : 30;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
