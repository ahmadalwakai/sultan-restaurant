'use client';

import { useEffect, useState } from 'react';
import { Activity, Zap, HardDrive, Wifi } from 'lucide-react';
import { Box, VStack, HStack, Text } from '@chakra-ui/react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

interface PerformanceMonitorProps {
  showMetrics?: boolean;
  className?: string;
}

export default function PerformanceMonitor({
  showMetrics = false,
  className
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });
  const [connectionSpeed, setConnectionSpeed] = useState<string>('unknown');
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null);

  useEffect(() => {
    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.name) {
          case 'FCP':
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
            break;
          case 'LCP':
            setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
            break;
          case 'FID':
            setMetrics(prev => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }));
            break;
          case 'CLS':
            setMetrics(prev => ({ ...prev, cls: (entry as any).value }));
            break;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['measure', 'navigation'] });

      // FCP, LCP, FID, CLS - using PerformanceObserver API
      // The web-vitals library functions have changed, using native PerformanceObserver instead
    } catch (error) {
      console.warn('Performance monitoring not fully supported:', error);
    }

    // Connection speed detection
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const updateConnection = () => {
        const downlink = connection.downlink;
        if (downlink >= 10) setConnectionSpeed('fast');
        else if (downlink >= 5) setConnectionSpeed('medium');
        else if (downlink >= 1) setConnectionSpeed('slow');
        else setConnectionSpeed('very-slow');
      };

      updateConnection();
      connection.addEventListener('change', updateConnection);
    }

    // Memory usage monitoring
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMemoryUsage(memory.usedJSHeapSize / memory.totalJSHeapSize);
      }
    };

    updateMemoryUsage();
    const memoryInterval = setInterval(updateMemoryUsage, 5000);

    return () => {
      observer.disconnect();
      clearInterval(memoryInterval);
    };
  }, []);

  const getScoreColor = (value: number | null, thresholds: { good: number; poor: number }) => {
    if (value === null) return 'text-gray-400';
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (ms: number | null) => {
    if (ms === null) return 'N/A';
    return `${ms.toFixed(0)}ms`;
  };

  const formatScore = (score: number | null) => {
    if (score === null) return 'N/A';
    return score.toFixed(3);
  };

  if (!showMetrics) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom={4}
      left={4}
      zIndex={50}
      bg="white"
      rounded="lg"
      shadow="lg"
      border="1px"
      borderColor="gray.200"
      p={4}
      maxW="xs"
      className={className}
    >
      <HStack gap={2} mb={3}>
        <Activity size={16} color="blue.600" />
        <Text fontSize="sm" fontWeight="semibold" color="gray.900">
          Performance
        </Text>
      </HStack>

      <VStack gap={2} fontSize="xs">
        <HStack justify="space-between" w="full">
          <Text color="gray.600">FCP:</Text>
          <Text color={getScoreColor(metrics.fcp, { good: 1800, poor: 3000 })}>
            {formatTime(metrics.fcp)}
          </Text>
        </HStack>

        <HStack justify="space-between" w="full">
          <Text color="gray.600">LCP:</Text>
          <Text color={getScoreColor(metrics.lcp, { good: 2500, poor: 4000 })}>
            {formatTime(metrics.lcp)}
          </Text>
        </HStack>

        <HStack justify="space-between" w="full">
          <Text color="gray.600">FID:</Text>
          <Text color={getScoreColor(metrics.fid, { good: 100, poor: 300 })}>
            {formatTime(metrics.fid)}
          </Text>
        </HStack>

        <HStack justify="space-between" w="full">
          <Text color="gray.600">CLS:</Text>
          <Text color={getScoreColor(metrics.cls, { good: 0.1, poor: 0.25 })}>
            {formatScore(metrics.cls)}
          </Text>
        </HStack>

        <Box borderTop="1px" borderColor="gray.200" pt={2} mt={2}>

        <VStack gap={1} w="full">
          <HStack justify="space-between" w="full">
            <HStack gap={1}>
              <Wifi size={12} color="gray.600" />
              <Text color="gray.600">Connection:</Text>
            </HStack>
            <Text
              textTransform="capitalize"
              color={
                connectionSpeed === 'fast' ? 'green.600' :
                connectionSpeed === 'medium' ? 'yellow.600' :
                connectionSpeed === 'slow' ? 'orange.600' :
                connectionSpeed === 'very-slow' ? 'red.600' : 'gray.600'
              }
            >
              {connectionSpeed.replace('-', ' ')}
            </Text>
          </HStack>

          {memoryUsage !== null && (
            <HStack justify="space-between" w="full">
              <HStack gap={1}>
                <HardDrive size={12} color="gray.600" />
                <Text color="gray.600">Memory:</Text>
              </HStack>
              <Text
                color={
                  memoryUsage > 0.8 ? 'red.600' :
                  memoryUsage > 0.6 ? 'yellow.600' : 'green.600'
                }
              >
                {(memoryUsage * 100).toFixed(0)}%
              </Text>
            </HStack>
          )}
        </VStack>
        </Box>
      </VStack>
    </Box>
  );
}