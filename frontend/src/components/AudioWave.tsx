
import React from 'react';
import { cn } from '@/lib/utils';

interface AudioWaveProps {
  className?: string;
  isActive?: boolean;
}

export function AudioWave({ className, isActive = true }: AudioWaveProps) {
  return (
    <div className={cn("speech-wave flex items-center gap-[2px]", className)}>
      <div className={cn("speech-wave-bar w-1 rounded-full bg-primary/80", 
        isActive ? "animate-sound-wave-1 h-3" : "h-1")}></div>
      <div className={cn("speech-wave-bar w-1 rounded-full bg-primary/80", 
        isActive ? "animate-sound-wave-2 h-5" : "h-3")}></div>
      <div className={cn("speech-wave-bar w-1 rounded-full bg-primary/80", 
        isActive ? "animate-sound-wave-3 h-6" : "h-5")}></div>
      <div className={cn("speech-wave-bar w-1 rounded-full bg-primary/80", 
        isActive ? "animate-sound-wave-2 h-5" : "h-3")}></div>
      <div className={cn("speech-wave-bar w-1 rounded-full bg-primary/80", 
        isActive ? "animate-sound-wave-1 h-3" : "h-1")}></div>
    </div>
  );
}

export default AudioWave;
