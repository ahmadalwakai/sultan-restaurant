"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const stats = [
  { label: "Happy Customers", target: 15000, suffix: "+" },
  { label: "Dishes Served", target: 50000, suffix: "+" },
  { label: "5-Star Reviews", target: 2500, suffix: "+" },
  { label: "Years of Service", target: 12, suffix: "" },
];

function useCountUp(target: number, duration: number, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, isVisible]);

  return count;
}

function StatItem({ label, target, suffix, isVisible }: { label: string; target: number; suffix: string; isVisible: boolean }) {
  const count = useCountUp(target, 2000, isVisible);

  return (
    <VStack textAlign="center">
      <Text fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold" color="orange.400">
        {count.toLocaleString()}{suffix}
      </Text>
      <Text mt={2} color="gray.500" fontWeight="medium">{label}</Text>
    </VStack>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box as="section" ref={ref} bg="gray.50" py={20}>
      <Container maxW="7xl" px={4}>
        <SectionHeader
          title="Sultan in Numbers"
          subtitle="Proudly serving our community since day one"
        />
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={8} mt={12}>
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} isVisible={isVisible} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
