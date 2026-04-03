"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Gold scroll progress bar at top of page
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #C8A951, #E8D48A, #C8A951)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 9999,
        boxShadow: "0 0 10px rgba(200, 169, 81, 0.5)",
      }}
    />
  );
}
