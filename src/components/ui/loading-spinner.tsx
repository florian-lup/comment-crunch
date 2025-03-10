import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-solid border-t-transparent',
        'bg-gradient-to-tr from-transparent via-transparent to-indigo-100',
        'border-indigo-500/70 shadow-[0_0_10px_rgba(99,102,241,0.1)]',
        sizeClasses[size],
        className
      )}
    />
  );
} 