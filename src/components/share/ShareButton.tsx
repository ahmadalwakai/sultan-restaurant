'use client';

import { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Globe, Hash } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
  variant?: 'button' | 'icon' | 'floating';
  showLabel?: boolean;
}

export default function ShareButton({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Check out Sultan Restaurant',
  text = 'Delicious food and great service!',
  className,
  variant = 'button',
  showLabel = true,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text,
    url,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
    setIsOpen(false);
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
    setIsOpen(false);
  };

  const shareOptions = [
    {
      label: 'Copy Link',
      icon: copied ? Check : Copy,
      action: handleCopyLink,
      color: copied ? 'text-green-600' : 'text-gray-600',
    },
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      action: shareToWhatsApp,
      color: 'text-green-600',
    },
    {
      label: 'Facebook',
      icon: Globe,
      action: shareToFacebook,
      color: 'text-blue-600',
    },
    {
      label: 'Twitter',
      icon: Hash,
      action: shareToTwitter,
      color: 'text-blue-400',
    },
  ];

  if (variant === 'icon') {
    return (
      <div className="relative">
        <button
          onClick={handleNativeShare}
          className={cn(
            'p-2 rounded-lg hover:bg-gray-100 transition-colors',
            className
          )}
          aria-label="Share"
        >
          <Share2 size={20} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
            <div className="p-2">
              {shareOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.label}
                    onClick={option.action}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Icon size={18} className={option.color} />
                    <span className="text-sm">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={handleNativeShare}
          className={cn(
            'w-14 h-14 bg-orange-600 text-white rounded-full shadow-lg',
            'flex items-center justify-center hover:bg-orange-700 transition-colors',
            className
          )}
          aria-label="Share"
        >
          <Share2 size={24} />
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border">
            <div className="p-2">
              {shareOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.label}
                    onClick={option.action}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Icon size={18} className={option.color} />
                    <span className="text-sm">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className={cn(
          'flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200',
          'rounded-lg transition-colors',
          className
        )}
      >
        <Share2 size={18} />
        {showLabel && <span className="text-sm font-medium">Share</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-2">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.label}
                  onClick={option.action}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Icon size={18} className={option.color} />
                  <span className="text-sm">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}