
import React from 'react';
import { Clock, Laptop, MicOff, Mic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AudioWave from './AudioWave';

interface InterviewHeaderProps {
  title: string;
  duration: string;
  isMicActive: boolean;
  onToggleMic: () => void;
  onEndInterview: () => void;
}

const InterviewHeader: React.FC<InterviewHeaderProps> = ({
  title,
  duration,
  isMicActive,
  onToggleMic,
  onEndInterview,
}) => {
  return (
    <div className="flex justify-between items-center border-b p-4 bg-card">
      <div className="flex items-center space-x-2">
        <Laptop className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-semibold">{title}</h1>
        <Badge variant="outline" className="ml-2">Frontend</Badge>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center text-muted-foreground mr-4">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{duration}</span>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onToggleMic}
                className={isMicActive ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700" : ""}
              >
                {isMicActive ? (
                  <>
                    <Mic className="h-4 w-4" />
                    <span className="sr-only">Microphone is active</span>
                  </>
                ) : (
                  <>
                    <MicOff className="h-4 w-4" />
                    <span className="sr-only">Microphone is off</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isMicActive ? (
                <div className="flex items-center gap-2">
                  <span>Microphone active</span>
                  <AudioWave />
                </div>
              ) : (
                "Turn on microphone"
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={onEndInterview}>
          End Interview
        </Button>
      </div>
    </div>
  );
};

export default InterviewHeader;
