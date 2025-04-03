
import { useState, useEffect, useRef, useCallback } from 'react';
import VoiceRecognition from '@/services/VoiceRecognition';

type SpeechRecognitionStatus = 'inactive' | 'listening' | 'processing' | 'error';

interface UseSpeechRecognitionReturn {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  status: SpeechRecognitionStatus;
  startListening: () => Promise<boolean>;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [status, setStatus] = useState<SpeechRecognitionStatus>('inactive');
  const [isSupported, setIsSupported] = useState<boolean>(false);
  
  const recognitionRef = useRef<VoiceRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    recognitionRef.current = new VoiceRecognition();
    setIsSupported(recognitionRef.current.isSupported());

    recognitionRef.current.onFinalTranscript((text) => {
      setTranscript((prev) => prev + ' ' + text.trim());
      setInterimTranscript('');
      setStatus('inactive');
    });

    recognitionRef.current.onInterimTranscript((text) => {
      setInterimTranscript(text);
      setStatus('listening');
    });

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(async (): Promise<boolean> => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (recognitionRef.current) {
        const started = recognitionRef.current.start();
        setIsListening(started);
        setStatus('listening');
        return started;
      }
      return false;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setStatus('error');
      return false;
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setStatus('inactive');
      setInterimTranscript('');
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    transcript,
    interimTranscript,
    isListening,
    status,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  };
}

export default useSpeechRecognition;
