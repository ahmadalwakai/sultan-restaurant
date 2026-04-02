'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils/cn';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'switch';
}

export default function ThemeToggle({
  className,
  size = 'md',
  variant = 'button'
}: ThemeToggleProps) {
  const { theme, setTheme, actualTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'auto') return <Monitor size={iconSizes[size]} />;
    return actualTheme === 'dark'
      ? <Moon size={iconSizes[size]} />
      : <Sun size={iconSizes[size]} />;
  };

  const getLabel = () => {
    if (theme === 'auto') return 'Auto';
    return actualTheme === 'dark' ? 'Dark' : 'Light';
  };

  if (variant === 'switch') {
    return (
      <div className={cn('flex items-center space-x-3', className)}>
        <span className="text-sm font-medium">{getLabel()}</span>
        <button
          onClick={handleThemeChange}
          className={cn(
            'relative rounded-full transition-colors',
            sizeClasses[size],
            actualTheme === 'dark'
              ? 'bg-gray-800 text-yellow-400'
              : 'bg-yellow-400 text-gray-800'
          )}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'} theme`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {getIcon()}
          </div>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleThemeChange}
      className={cn(
        'flex items-center justify-center rounded-lg transition-colors',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        sizeClasses[size],
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'} theme`}
    >
      {getIcon()}
    </button>
  );
}