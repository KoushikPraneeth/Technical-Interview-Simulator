
import React from 'react';
import { cn } from '@/lib/utils';

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
      <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse animation-delay-150"></div>
      <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse animation-delay-300"></div>
    </div>
  );
}

export default TypingIndicator;
