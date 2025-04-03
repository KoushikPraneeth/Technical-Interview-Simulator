
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Send } from 'lucide-react';
import AudioWave from './AudioWave';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import { useToast } from '@/hooks/use-toast';

interface SpeechInputProps {
  onSend: (text: string) => void;
}

const SpeechInput: React.FC<SpeechInputProps> = ({ onSend }) => {
  const { toast } = useToast();
  const {
    transcript,
    interimTranscript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  } = useSpeechRecognition();
  
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (transcript.trim()) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleToggleMic = async () => {
    if (!isListening) {
      const success = await startListening();
      if (success) {
        toast({
          title: "Microphone activated",
          description: "Your voice input is now being recorded.",
        });
      } else {
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to use voice features.",
          variant: "destructive",
        });
      }
    } else {
      stopListening();
      toast({
        title: "Microphone deactivated",
        description: "Voice input has been turned off.",
      });
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText.trim());
      setInputText('');
      resetTranscript();
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center p-4 border rounded-md bg-yellow-50 text-yellow-800">
        <p>Speech recognition is not supported in your browser.</p>
        <p className="text-sm mt-2">Please use Chrome, Edge, or Safari for voice features.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button
          variant={isListening ? "default" : "outline"}
          size="icon"
          onClick={handleToggleMic}
          className={isListening ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isListening ? <Mic /> : <MicOff />}
        </Button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={isListening ? (interimTranscript || inputText) : inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your response or use the microphone..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          {isListening && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AudioWave className="h-4" isActive={true} />
            </div>
          )}
        </div>
        
        <Button onClick={handleSend}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
      
      {isListening && (
        <Card className="p-2 bg-gray-50">
          <p className="text-xs text-muted-foreground">
            {interimTranscript || "Listening..."}
          </p>
        </Card>
      )}
    </div>
  );
};

export default SpeechInput;
