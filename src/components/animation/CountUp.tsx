"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

export function CountUp({ end, duration = 2000, prefix = "", suffix = "" }: Props) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}
