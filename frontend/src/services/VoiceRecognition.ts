
// Define the SpeechRecognition interface
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  confidence: number;
  transcript: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: ((event: Event) => void) | null;
  onerror: ((event: Event & { error: string }) => void) | null;
  start(): void;
  stop(): void;
}

export class VoiceRecognition {
  private recognition: SpeechRecognition | null = null;
  private isListening: boolean = false;
  private onTranscriptCallback: ((transcript: string) => void) | null = null;
  private onInterimCallback: ((transcript: string) => void) | null = null;
  private abortController: AbortController | null = null;

  constructor() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionAPI() as SpeechRecognition;
      this.setupRecognition();
    } else {
      console.error('Speech recognition not supported in this browser');
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript;
      const isFinal = event.results[lastResultIndex].isFinal;

      if (isFinal && this.onTranscriptCallback) {
        this.onTranscriptCallback(transcript);
      } else if (!isFinal && this.onInterimCallback) {
        this.onInterimCallback(transcript);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        this.recognition?.start();
      }
    };
  }

  public start() {
    if (!this.recognition) {
      console.error('Speech recognition not supported');
      return false;
    }

    try {
      this.isListening = true;
      this.recognition.start();
      this.abortController = new AbortController();
      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      return false;
    }
  }

  public stop() {
    if (!this.recognition) return;

    this.isListening = false;
    this.recognition.stop();
    this.abortController?.abort();
    this.abortController = null;
  }

  public onFinalTranscript(callback: (transcript: string) => void) {
    this.onTranscriptCallback = callback;
  }

  public onInterimTranscript(callback: (transcript: string) => void) {
    this.onInterimCallback = callback;
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }
}

// Add TypeScript declarations for browser SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export default VoiceRecognition;
