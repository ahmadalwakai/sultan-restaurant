'use client';

import { useEffect, useState } from 'react';
import { Activity, Zap, HardDrive, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

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
    <div className={cn('fixed bottom-4 left-4 z-50 bg-white rounded-lg shadow-lg border p-4 max-w-xs', className)}>
      <div className="flex items-center space-x-2 mb-3">
        <Activity className="w-4 h-4 text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900">Performance</h3>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">FCP:</span>
          <span className={getScoreColor(metrics.fcp, { good: 1800, poor: 3000 })}>
            {formatTime(metrics.fcp)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">LCP:</span>
          <span className={getScoreColor(metrics.lcp, { good: 2500, poor: 4000 })}>
            {formatTime(metrics.lcp)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">FID:</span>
          <span className={getScoreColor(metrics.fid, { good: 100, poor: 300 })}>
            {formatTime(metrics.fid)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">CLS:</span>
          <span className={getScoreColor(metrics.cls, { good: 0.1, poor: 0.25 })}>
            {formatScore(metrics.cls)}
          </span>
        </div>

        <div className="border-t pt-2 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Wifi className="w-3 h-3 text-gray-600" />
              <span className="text-gray-600">Connection:</span>
            </div>
            <span className={cn(
              'capitalize',
              connectionSpeed === 'fast' && 'text-green-600',
              connectionSpeed === 'medium' && 'text-yellow-600',
              connectionSpeed === 'slow' && 'text-orange-600',
              connectionSpeed === 'very-slow' && 'text-red-600'
            )}>
              {connectionSpeed.replace('-', ' ')}
            </span>
          </div>

          {memoryUsage !== null && (
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center space-x-1">
                <HardDrive className="w-3 h-3 text-gray-600" />
                <span className="text-gray-600">Memory:</span>
              </div>
              <span className={cn(
                (memoryUsage > 0.8) && 'text-red-600',
                (memoryUsage > 0.6) && 'text-yellow-600',
                (memoryUsage <= 0.6) && 'text-green-600'
              )}>
                {(memoryUsage * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}