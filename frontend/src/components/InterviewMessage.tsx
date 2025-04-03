import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import TypingIndicator from "./TypingIndicator";
import ReactMarkdown from "react-markdown";

interface InterviewMessageProps {
  type: "user" | "interviewer";
  content: string;
  isTyping?: boolean;
  isSpeaking?: boolean;
}

const InterviewMessage: React.FC<InterviewMessageProps> = ({
  type,
  content,
  isTyping = false,
  isSpeaking = false,
}) => {
  return (
    <div
      className={`flex ${
        type === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {type === "interviewer" && (
        <Avatar className="mr-2">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            AI
          </AvatarFallback>
        </Avatar>
      )}

      <Card
        className={`max-w-[80%] ${
          type === "user"
            ? "bg-primary text-primary-foreground"
            : isSpeaking
            ? "bg-secondary border-2 border-primary/50 shadow-md"
            : "bg-secondary"
        }`}
      >
        <CardContent className="p-3">
          {isTyping ? (
            <TypingIndicator />
          ) : (
            <div className="text-sm markdown-content relative">
              <ReactMarkdown>{content}</ReactMarkdown>
              {isSpeaking && type === "interviewer" && (
                <div className="absolute top-0 right-0 flex items-center gap-1 text-xs text-primary p-1 rounded-md bg-background/80">
                  <span>Speaking</span>
                  <div className="flex gap-0.5">
                    <div className="w-1 h-3 bg-primary rounded-full animate-sound-wave-1"></div>
                    <div className="w-1 h-4 bg-primary rounded-full animate-sound-wave-2"></div>
                    <div className="w-1 h-5 bg-primary rounded-full animate-sound-wave-3"></div>
                    <div className="w-1 h-4 bg-primary rounded-full animate-sound-wave-2"></div>
                    <div className="w-1 h-3 bg-primary rounded-full animate-sound-wave-1"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {type === "user" && (
        <Avatar className="ml-2">
          <AvatarImage src="" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default InterviewMessage;
