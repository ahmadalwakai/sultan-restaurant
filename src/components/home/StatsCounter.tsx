"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/sections/SectionHeader";

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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
    <div className="text-center">
      <div className="text-4xl font-bold text-amber-500 md:text-5xl">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="mt-2 text-gray-500 font-medium">{label}</p>
    </div>
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
    <section ref={ref} className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Sultan in Numbers"
          subtitle="Proudly serving our community since day one"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
