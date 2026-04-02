'use client';

import { useEffect, useRef } from 'react';
import { generateEmbedUrl } from '@/lib/maps/utils';

interface MapEmbedProps {
  location?: { lat: number; lng: number };
  zoom?: number;
  apiKey?: string;
  width?: string;
  height?: string;
  className?: string;
  title?: string;
}

export const MapEmbed: React.FC<MapEmbedProps> = ({
  location = { lat: 55.8642, lng: -4.2518 }, // Default to Sultan Restaurant
  zoom = 15,
  apiKey,
  width = '100%',
  height = '300px',
  className = '',
  title = 'Location Map',
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && apiKey) {
      const embedUrl = generateEmbedUrl(location, zoom, apiKey);
      iframeRef.current.src = embedUrl;
    }
  }, [location, zoom, apiKey]);

  if (!apiKey) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <p className="text-gray-500 mb-2">Map embed unavailable</p>
          <p className="text-sm text-gray-400">API key required</p>
        </div>
      </div>
    );
  }

  const embedUrl = generateEmbedUrl(location, zoom, apiKey);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <iframe
        ref={iframeRef}
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
};