import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ButtonGroup";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import InterviewHeader from "@/components/InterviewHeader";
import InterviewMessage from "@/components/InterviewMessage";
import CodeEditor from "@/components/CodeEditor";
import FeedbackCard from "@/components/FeedbackCard";
import ThemeToggle from "@/components/ThemeToggle";
import AIService from "@/services/AIService";

const Interview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMicActive, setIsMicActive] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; type: "user" | "interviewer"; content: string }[]
  >([
    {
      id: 1,
      type: "interviewer",
      content:
        "Hello! I'm your AI interviewer today. We'll be focusing on React fundamentals and hooks. Can you explain the difference between useState and useRef?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState("00:15:30");
  const [feedback, setFeedback] = useState<
    Array<{
      type: "positive" | "negative" | "suggestion";
      title: string;
      content: string;
    }>
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(
    "Can you explain the difference between useState and useRef?"
  );

  // Create a ref for the AI service to persist between renders
  const aiServiceRef = useRef<AIService | null>(null);

  // Initialize AI service
  useEffect(() => {
    aiServiceRef.current = new AIService();

    // Build conversation context from existing messages
    const context = messages
      .map(
        (msg) =>
          `${msg.type === "interviewer" ? "Interviewer" : "Candidate"}: ${
            msg.content
          }`
      )
      .join("\n");

    if (aiServiceRef.current) {
      aiServiceRef.current.updateContext(context);
    }

    // Initialize speech synthesis voices
    if (window.speechSynthesis) {
      // Load voices - in some browsers, getVoices() is async and needs this event
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          console.log("Voices loaded:", speechSynthesis.getVoices().length);
        };
      }

      // Force load voices
      speechSynthesis.getVoices();
    }

    // Cleanup function
    return () => {
      // Stop any ongoing speech when component unmounts
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      // Clean up audio resources
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Start AI typing indicator
    setIsTyping(true);

    try {
      if (!aiServiceRef.current) {
        throw new Error("AI service not initialized");
      }

      // Generate feedback for the user's answer
      const feedbackPromise = aiServiceRef.current.generateFeedback(
        text,
        currentQuestion
      );

      // Generate AI response
      const aiResponse = await aiServiceRef.current.generateResponse(
        text,
        currentQuestion
      );

      // Add AI response to messages
      const aiMessage = {
        id: Date.now(),
        type: "interviewer" as const,
        content: aiResponse,
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Update conversation context
      const updatedContext = [...messages, userMessage, aiMessage]
        .map(
          (msg) =>
            `${msg.type === "interviewer" ? "Interviewer" : "Candidate"}: ${
              msg.content
            }`
        )
        .join("\n");

      aiServiceRef.current.updateContext(updatedContext);

      // Extract the next question from the AI response (if any)
      // This is a simple heuristic - in a real app, you might want to use a more sophisticated approach
      const questionMatch = aiResponse.match(
        /(?:\?|Can you|Could you|How would you|What is|Explain)[^.?!]*\?/
      );
      if (questionMatch) {
        setCurrentQuestion(questionMatch[0]);
      }

      // Update feedback
      const newFeedback = await feedbackPromise;
      setFeedback(newFeedback);

      // If in voice mode, speak the AI response
      if (isMicActive) {
        try {
          setIsSpeaking(true);

          // Extract the first question or important part to speak
          let speechText = aiResponse;
          const questionMatch = aiResponse.match(
            /(?:\?|Can you|Could you|How would you|What is|Explain)[^.?!]*\?/
          );
          if (questionMatch && questionMatch[0]) {
            speechText = questionMatch[0].trim();
          }

          // Use Groq's PlayAI TTS model
          const speechBuffer = await aiServiceRef.current.textToSpeech(
            speechText
          );

          if (speechBuffer) {
            // Convert ArrayBuffer to Blob with the correct MIME type
            const blob = new Blob([speechBuffer], { type: "audio/wav" });
            const url = URL.createObjectURL(blob);

            // Create audio element if it doesn't exist
            if (!audioRef.current) {
              audioRef.current = new Audio();
              audioRef.current.onended = () => {
                setIsSpeaking(false);
                URL.revokeObjectURL(url); // Clean up the URL
              };
            }

            // Set the source and play
            audioRef.current.src = url;
            audioRef.current.play().catch((err) => {
              console.error("Error playing audio:", err);
              setIsSpeaking(false);
              URL.revokeObjectURL(url);

              // Fallback to browser's speech synthesis if Groq TTS fails
              if (window.speechSynthesis) {
                console.log("Falling back to browser speech synthesis");
                // Cancel any ongoing speech
                window.speechSynthesis.cancel();

                // Create a new utterance
                const utterance = new SpeechSynthesisUtterance(speechText);
                utterance.lang = "en-US";
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);

                // Start speaking
                window.speechSynthesis.speak(utterance);
              }
            });
          } else {
            setIsSpeaking(false);

            // Fallback to browser's speech synthesis if Groq TTS returns null
            if (window.speechSynthesis) {
              console.log("Falling back to browser speech synthesis");
              // Cancel any ongoing speech
              window.speechSynthesis.cancel();

              // Create a new utterance
              const utterance = new SpeechSynthesisUtterance(speechText);
              utterance.lang = "en-US";
              utterance.onend = () => setIsSpeaking(false);
              utterance.onerror = () => setIsSpeaking(false);

              // Start speaking
              window.speechSynthesis.speak(utterance);
            }
          }
        } catch (speechError) {
          console.error("Error playing speech:", speechError);
          setIsSpeaking(false);
          toast({
            title: "Speech synthesis failed",
            description: "Could not generate speech for the AI response.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  // For recording audio
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const micStreamRef = useRef<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle between voice and text input modes
  const handleToggleMic = () => {
    if (!isMicActive) {
      // Switch to voice input mode
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Just request permission and store the stream for later use
          micStreamRef.current = stream;
          setIsMicActive(true);
          toast({
            title: "Voice mode activated",
            description: "Press and hold the microphone button to speak.",
          });
        })
        .catch((err) => {
          toast({
            title: "Microphone access denied",
            description:
              "Please allow microphone access to use voice features.",
            variant: "destructive",
          });
          console.error("Error accessing microphone:", err);
        });
    } else {
      // Switch to text input mode
      if (micStreamRef.current) {
        // Clean up the stream when switching back to text mode
        micStreamRef.current.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
      }

      // Stop any ongoing recording
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }

      setIsMicActive(false);
      setIsRecording(false);
      toast({
        title: "Text mode activated",
        description: "You can now type your responses.",
      });
    }
  };

  // Start recording when the mic button is pressed
  const startRecording = () => {
    if (!micStreamRef.current) {
      toast({
        title: "Microphone not available",
        description: "Please allow microphone access to use voice features.",
        variant: "destructive",
      });
      return;
    }

    setIsRecording(true);

    // Create media recorder
    const mediaRecorder = new MediaRecorder(micStreamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    // Handle data available event
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    // Handle recording stop event
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/m4a",
      });

      // Show transcribing indicator
      setIsTyping(true);

      try {
        if (!aiServiceRef.current) {
          throw new Error("AI service not initialized");
        }

        // Transcribe audio using Groq
        const transcript = await aiServiceRef.current.speechToText(audioBlob);

        if (transcript) {
          // Send the transcribed text as a message
          handleSendMessage(transcript);
        } else {
          toast({
            title: "Transcription failed",
            description:
              "Could not transcribe your speech. Please try again or use text input.",
            variant: "destructive",
          });
          setIsTyping(false);
        }
      } catch (error) {
        console.error("Error processing speech:", error);
        toast({
          title: "Speech processing error",
          description: "An error occurred while processing your speech.",
          variant: "destructive",
        });
        setIsTyping(false);
      }
    };

    // Start recording
    mediaRecorder.start();
  };

  // Stop recording when the mic button is released
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
  };

  const handleEndInterview = () => {
    toast({
      title: "Interview ended",
      description: "Your interview session has been completed and saved.",
    });
    navigate("/history");
  };

  useEffect(() => {
    // Mock timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => {
        const [minutes, seconds] = prev.split(":").map(Number);
        let newMinutes = minutes;
        let newSeconds = seconds - 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          clearInterval(interval);
          return "00:00:00";
        }

        return `${String(newMinutes).padStart(2, "0")}:${String(
          newSeconds
        ).padStart(2, "0")}:00`;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="flex items-center justify-between p-2 bg-background border-b">
        <div></div>
        <ThemeToggle />
      </div>
      <InterviewHeader
        title="React Frontend Interview"
        duration={timer}
        isMicActive={isMicActive}
        onToggleMic={handleToggleMic}
        onEndInterview={handleEndInterview}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden border-r">
          <div className="flex-1 overflow-y-auto p-4 bg-muted/20">
            {messages.map((message) => (
              <InterviewMessage
                key={message.id}
                type={message.type}
                content={message.content}
                isSpeaking={
                  isSpeaking &&
                  message.type === "interviewer" &&
                  message.id === messages[messages.length - 1]?.id
                }
              />
            ))}

            {isTyping && (
              <InterviewMessage type="interviewer" content="" isTyping={true} />
            )}
          </div>

          <div className="p-4 border-t bg-card">
            <div className="flex gap-2">
              <ButtonGroup variant="outline" className="mr-2">
                <Button
                  variant={isMicActive ? "default" : "outline"}
                  onClick={() => handleToggleMic()}
                  className="flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                  Voice
                </Button>
                <Button
                  variant={!isMicActive ? "default" : "outline"}
                  onClick={() => handleToggleMic()}
                  className="flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Text
                </Button>
              </ButtonGroup>

              {!isMicActive && (
                <>
                  <input
                    type="text"
                    placeholder="Type your response..."
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      const input = document.querySelector("input");
                      if (input) {
                        handleSendMessage(input.value);
                        input.value = "";
                      }
                    }}
                  >
                    Send
                  </Button>
                </>
              )}

              {isMicActive && (
                <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md bg-muted/20">
                  <Button
                    className={`flex items-center justify-center gap-2 w-full h-12 rounded-full text-white font-medium transition-all ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 shadow-lg scale-105 ring-4 ring-red-300 dark:ring-red-700/30"
                        : "bg-primary hover:bg-primary/90 shadow"
                    }`}
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    onMouseLeave={stopRecording}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                    {isRecording ? "Release to send" : "Press & hold to speak"}
                    {isRecording && (
                      <div className="flex gap-1 ml-1">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-150"></div>
                      </div>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col overflow-hidden bg-background">
          <Tabs defaultValue="feedback" className="flex-1 flex flex-col">
            <div className="px-4 pt-4">
              <TabsList className="w-full">
                <TabsTrigger value="feedback" className="flex-1">
                  Feedback
                </TabsTrigger>
                <TabsTrigger value="code" className="flex-1">
                  Code Editor
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="feedback"
              className="flex-1 overflow-y-auto p-4"
            >
              <h3 className="text-lg font-medium mb-3">Real-time Feedback</h3>
              {feedback.length > 0 ? (
                feedback.map((item, index) => (
                  <FeedbackCard
                    key={index}
                    type={item.type}
                    title={item.title}
                    content={item.content}
                  />
                ))
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  Feedback will appear here after you respond to questions.
                </div>
              )}
            </TabsContent>

            <TabsContent value="code" className="flex-1 overflow-hidden p-4">
              <h3 className="text-lg font-medium mb-3">Code Editor</h3>
              <div className="h-[calc(100%-2rem)]">
                <CodeEditor value={code} onChange={setCode} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Interview;
