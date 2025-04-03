import Groq from "groq-sdk";

interface AIQuestion {
  id: string;
  content: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
}

interface AIFeedback {
  type: "positive" | "negative" | "suggestion";
  title: string;
  content: string;
}

// Define the feedback schema for JSON responses
const FEEDBACK_SCHEMA = {
  type: "object",
  properties: {
    technicalSkills: {
      type: "object",
      properties: {
        score: { type: "number", minimum: 0, maximum: 10 },
        strengths: { type: "array", items: { type: "string" } },
        areasToImprove: { type: "array", items: { type: "string" } },
      },
      required: ["score", "strengths", "areasToImprove"],
    },
    communicationSkills: {
      type: "object",
      properties: {
        score: { type: "number", minimum: 0, maximum: 10 },
        strengths: { type: "array", items: { type: "string" } },
        areasToImprove: { type: "array", items: { type: "string" } },
      },
      required: ["score", "strengths", "areasToImprove"],
    },
    overallFeedback: { type: "string" },
  },
  required: ["technicalSkills", "communicationSkills", "overallFeedback"],
};

export class AIService {
  private groq: any; // Using 'any' temporarily until we have proper types
  private apiKey: string;
  private openAIApiKey: string | null = null;
  private conversationContext: string = "";
  private audioContext: AudioContext | null = null;

  // Fallback questions if API calls fail
  private reactQuestions: AIQuestion[] = [
    {
      id: "r1",
      content:
        "Can you explain how React's virtual DOM works and why it's important?",
      difficulty: "medium",
      topic: "React Concepts",
    },
    {
      id: "r2",
      content:
        "What's the difference between useState and useReducer hooks, and when would you use one over the other?",
      difficulty: "medium",
      topic: "React Hooks",
    },
    {
      id: "r3",
      content:
        "Can you explain the concept of React Fiber and why it was introduced?",
      difficulty: "hard",
      topic: "React Internals",
    },
  ];

  private javascriptQuestions: AIQuestion[] = [
    {
      id: "js1",
      content:
        "What is the difference between let, const, and var in JavaScript?",
      difficulty: "easy",
      topic: "JavaScript Basics",
    },
    {
      id: "js2",
      content: "Can you explain closure in JavaScript with an example?",
      difficulty: "medium",
      topic: "JavaScript Concepts",
    },
  ];

  constructor() {
    // Get API keys from environment variables
    this.apiKey =
      import.meta.env.VITE_GROQ_API_KEY ||
      "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";

    // Try to get OpenAI API key for TTS
    this.openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY || null;

    // Initialize Groq client
    this.groq = new Groq({
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true, // Required for client-side usage
    });

    // Initialize AudioContext for TTS
    if (typeof window !== "undefined" && window.AudioContext) {
      this.audioContext = new AudioContext();
    }
  }

  // Update conversation context
  public updateContext(context: string): void {
    this.conversationContext = context;
  }

  // Generate a response to the user's answer
  public async generateResponse(
    userAnswer: string,
    currentQuestion: string
  ): Promise<string> {
    try {
      if (!this.apiKey) {
        console.warn("Groq API key not found. Using mock response.");
        return this.getMockResponse();
      }

      const systemPrompt =
        "You are an experienced technical interviewer conducting a programming interview. " +
        "Your role is to ask questions, listen to the candidate's responses, and ask follow-up questions. " +
        "Do NOT provide detailed explanations or answers to your own questions. " +
        "Be professional, concise, and focus on evaluating the candidate's knowledge. " +
        "Ask one question at a time and wait for the candidate's response. " +
        "IMPORTANT: Do not use <think> tags or include your thinking process in your response. " +
        "Keep your responses brief and focused on guiding the interview.";

      const messages = [{ role: "system", content: systemPrompt }];

      // Add context if available
      if (this.conversationContext) {
        messages.push({
          role: "system",
          content: `Previous conversation context: ${this.conversationContext}`,
        });
      }

      // Add the current question and user's answer
      messages.push({
        role: "user",
        content: `Current question: ${currentQuestion}\nCandidate's answer: ${userAnswer}`,
      });

      const chatCompletion = await this.groq.chat.completions.create({
        messages: messages,
        model: "qwen-qwq-32b",
        temperature: 0.6,
        max_completion_tokens: 1000,
        top_p: 0.95,
        stream: false,
        stop: null,
      });

      // Get the response content
      let responseContent =
        chatCompletion.choices[0].message.content || this.getMockResponse();

      // Remove <think>...</think> blocks if present
      responseContent = responseContent.replace(
        /<think>[\s\S]*?<\/think>/g,
        ""
      );

      // Trim any extra whitespace that might be left after removing think blocks
      responseContent = responseContent.trim();

      return responseContent;
    } catch (error) {
      console.error("Error generating AI response:", error);
      return this.getMockResponse();
    }
  }

  // Generate feedback for a user's answer
  public async generateFeedback(
    userAnswer: string,
    currentQuestion: string
  ): Promise<AIFeedback[]> {
    try {
      if (!this.apiKey) {
        console.warn("Groq API key not found. Using mock feedback.");
        return this.getMockFeedback();
      }

      const feedbackPrompt =
        "As an expert interviewer, analyze the following interview answer and provide detailed feedback. " +
        "Consider technical accuracy, communication skills, problem-solving approach, and areas for improvement. " +
        "IMPORTANT: Return ONLY a valid JSON object following this schema with no additional text, comments, or thinking: " +
        JSON.stringify(FEEDBACK_SCHEMA) +
        "\n\nDO NOT include any <think> tags or explanations outside the JSON. Your entire response must be a valid JSON object.";

      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          { role: "system", content: feedbackPrompt },
          {
            role: "user",
            content: `Question: ${currentQuestion}\nAnswer: ${userAnswer}`,
          },
        ],
        model: "qwen-qwq-32b",
        temperature: 0.6,
        max_completion_tokens: 2000,
        top_p: 0.95,
        stream: false,
        stop: null,
      });

      const content = chatCompletion.choices[0].message.content;
      if (!content) {
        return this.getMockFeedback();
      }

      try {
        // Clean up the content to remove any <think> tags or non-JSON content
        let cleanedContent = content;

        // Remove <think>...</think> blocks if present
        cleanedContent = cleanedContent.replace(
          /<think>[\s\S]*?<\/think>/g,
          ""
        );

        // Try to find a JSON object in the content
        const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cleanedContent = jsonMatch[0];
        }

        console.log("Cleaned content for parsing:", cleanedContent);
        const parsedFeedback = JSON.parse(cleanedContent);

        // Convert the structured feedback to our AIFeedback format
        const feedbackItems: AIFeedback[] = [];

        // Add technical strengths
        parsedFeedback.technicalSkills.strengths.forEach((strength: string) => {
          feedbackItems.push({
            type: "positive",
            title: "Technical Strength",
            content: strength,
          });
        });

        // Add technical areas to improve
        parsedFeedback.technicalSkills.areasToImprove.forEach(
          (area: string) => {
            feedbackItems.push({
              type: "negative",
              title: "Technical Improvement",
              content: area,
            });
          }
        );

        // Add communication strengths
        parsedFeedback.communicationSkills.strengths.forEach(
          (strength: string) => {
            feedbackItems.push({
              type: "positive",
              title: "Communication Strength",
              content: strength,
            });
          }
        );

        // Add communication areas to improve
        parsedFeedback.communicationSkills.areasToImprove.forEach(
          (area: string) => {
            feedbackItems.push({
              type: "suggestion",
              title: "Communication Improvement",
              content: area,
            });
          }
        );

        // Add overall feedback
        if (parsedFeedback.overallFeedback) {
          feedbackItems.push({
            type: "suggestion",
            title: "Overall Feedback",
            content: parsedFeedback.overallFeedback,
          });
        }

        return feedbackItems;
      } catch (parseError) {
        console.error("Error parsing feedback JSON:", parseError);
        return this.getMockFeedback();
      }
    } catch (error) {
      console.error("Error parsing feedback JSON:", error);
      // Create a simple feedback based on the raw content
      try {
        const rawContent =
          error instanceof Error ? error.message : String(error);
        // If we can't parse the JSON, try to extract some meaningful feedback from the text
        const feedbackItems: AIFeedback[] = [];

        // Add a general feedback item
        feedbackItems.push({
          type: "suggestion",
          title: "General Feedback",
          content:
            "The AI provided feedback but it couldn't be properly formatted. Here's the raw feedback:",
        });

        // Add the raw content as feedback
        feedbackItems.push({
          type: "suggestion",
          title: "Raw Feedback",
          content:
            rawContent.substring(0, 500) +
            (rawContent.length > 500 ? "..." : ""),
        });

        return feedbackItems;
      } catch (innerError) {
        console.error("Error creating simple feedback:", innerError);
        return this.getMockFeedback();
      }
    }
  }

  // Get a question for a specific topic
  public async getNextQuestion(
    topic: "react" | "javascript" | "general" = "react",
    difficulty?: "easy" | "medium" | "hard"
  ): Promise<AIQuestion> {
    try {
      if (!this.apiKey) {
        console.warn("Groq API key not found. Using mock question.");
        return this.getMockQuestion(topic, difficulty);
      }

      const difficultyLevel = difficulty || "medium";
      const promptContent = `Generate a challenging ${difficultyLevel} level technical interview question about ${topic}. The question should be specific and test deep understanding.`;

      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an expert technical interviewer. Generate one concise, specific interview question without any additional text or explanation. " +
              "IMPORTANT: Do not use <think> tags or include your thinking process in your response. " +
              "Provide your response directly without any meta-commentary.",
          },
          { role: "user", content: promptContent },
        ],
        model: "qwen-qwq-32b",
        temperature: 0.7,
        max_completion_tokens: 500,
        top_p: 0.95,
        stream: false,
        stop: null,
      });

      // Get the question content
      let questionContent =
        chatCompletion.choices[0].message.content?.trim() || "";

      // Remove <think>...</think> blocks if present
      questionContent = questionContent.replace(
        /<think>[\s\S]*?<\/think>/g,
        ""
      );

      // Trim any extra whitespace that might be left after removing think blocks
      questionContent = questionContent.trim();

      if (!questionContent) {
        return this.getMockQuestion(topic, difficulty);
      }

      return {
        id: Date.now().toString(),
        content: questionContent,
        difficulty: difficultyLevel,
        topic: topic,
      };
    } catch (error) {
      console.error("Error generating next question:", error);
      return this.getMockQuestion(topic, difficulty);
    }
  }

  // Fallback methods for when API calls fail
  private getMockResponse(): string {
    const responses = [
      "Thank you for that explanation. Now, let's go deeper - can you explain how you would implement this in a real-world scenario?",
      "Interesting perspective. Could you elaborate more on how this approach affects application performance?",
      "Good answer. Let's switch topics a bit - what about error handling in this context?",
      "That's a solid explanation. How would you approach testing this functionality?",
      "I appreciate your detailed response. Now, imagine you're explaining this to a junior developer - how would you simplify it?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getMockFeedback(): AIFeedback[] {
    return [
      {
        type: "positive",
        title: "Clear Explanation",
        content:
          "You provided a coherent and technically accurate explanation of the core concepts.",
      },
      {
        type: "suggestion",
        title: "Consider Real-world Examples",
        content:
          "Adding a specific code example or real-world scenario would strengthen your explanation.",
      },
      {
        type: "negative",
        title: "Technical Depth",
        content:
          "Consider diving deeper into the underlying mechanisms to demonstrate more comprehensive knowledge.",
      },
    ];
  }

  private getMockQuestion(
    topic: "react" | "javascript" | "general",
    difficulty?: "easy" | "medium" | "hard"
  ): AIQuestion {
    const questionSet =
      topic === "javascript" ? this.javascriptQuestions : this.reactQuestions;
    let filteredQuestions = questionSet;

    if (difficulty) {
      filteredQuestions = questionSet.filter(
        (q) => q.difficulty === difficulty
      );
      if (filteredQuestions.length === 0) {
        filteredQuestions = questionSet;
      }
    }

    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  }

  // Speech to text conversion using Groq's Whisper model
  public async speechToText(audioBlob: Blob): Promise<string> {
    try {
      if (!this.apiKey) {
        console.warn("Groq API key not found. Cannot transcribe audio.");
        return "";
      }

      // Convert blob to file
      const file = new File([audioBlob], "audio.m4a", { type: "audio/m4a" });

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", "whisper-large-v3-turbo");
      formData.append("response_format", "verbose_json");

      // Make direct API call since the SDK might not support file uploads in browser
      const response = await fetch(
        "https://api.groq.com/openai/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to transcribe audio: ${response.status} ${response.statusText}`,
          errorText
        );
        throw new Error(`Failed to transcribe audio: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Transcription response:", data);
      return data.text || "";
    } catch (error) {
      console.error("Error transcribing audio:", error);
      return "";
    }
  }

  // Text to speech conversion using Groq's PlayAI TTS model
  public async textToSpeech(text: string): Promise<ArrayBuffer | null> {
    try {
      if (!this.apiKey) {
        console.warn("Groq API key not found. Cannot generate speech.");
        return null;
      }

      // Extract the first sentence or a portion of the text if it's too long
      // This helps avoid issues with API limits
      let speechText = text;

      // If text is very long, try to find the first question or a reasonable chunk
      if (text.length > 500) {
        // Try to find the first question
        const questionMatch = text.match(/[^.!?]*\?/);
        if (questionMatch && questionMatch[0]) {
          speechText = questionMatch[0].trim();
        } else {
          // Otherwise just take the first 2 sentences or 200 chars
          const sentenceMatch = text.match(/^([^.!?]*[.!?]){1,2}/);
          if (sentenceMatch && sentenceMatch[0]) {
            speechText = sentenceMatch[0].trim();
          } else {
            speechText = text.substring(0, 200) + "...";
          }
        }
      }

      console.log("Converting to speech with Groq PlayAI:", speechText);

      // Use the Groq SDK directly for TTS
      try {
        const wav = await this.groq.audio.speech.create({
          model: "playai-tts",
          voice: "Arista-PlayAI",
          input: speechText,
          response_format: "wav",
        });

        // Convert the response to ArrayBuffer
        return await wav.arrayBuffer();
      } catch (groqError) {
        console.error("Error with Groq TTS API:", groqError);

        // If Groq API fails, fall back to browser's SpeechSynthesis
        if (typeof window !== "undefined" && window.speechSynthesis) {
          console.log("Falling back to browser speech synthesis");
          return this.generateSpeechWithBrowserAPI(speechText);
        }
        throw groqError;
      }
    } catch (error) {
      console.error("Error generating speech:", error);
      return null;
    }
  }

  // Generate speech using the browser's SpeechSynthesis API
  private generateSpeechWithBrowserAPI(text: string): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        reject(new Error("SpeechSynthesis API not available"));
        return;
      }

      // Create a SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Find a good voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find(
          (voice) =>
            voice.name.includes("Google") ||
            voice.name.includes("Premium") ||
            voice.name.includes("Enhanced")
        ) ||
        voices.find((voice) => voice.lang === "en-US") ||
        voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      // Create a dummy audio element to return an ArrayBuffer
      // This is a workaround since SpeechSynthesis doesn't provide audio data directly
      // We're creating a 1-second silent audio buffer as a placeholder
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const buffer = audioContext.createBuffer(
        1,
        audioContext.sampleRate,
        audioContext.sampleRate
      );
      const source = audioContext.createBufferSource();
      source.buffer = buffer;

      // Start speech synthesis
      window.speechSynthesis.speak(utterance);

      // Convert the buffer to ArrayBuffer
      const arrayBuffer = buffer.getChannelData(0).buffer;
      resolve(arrayBuffer);
    });
  }

  // Play audio from ArrayBuffer
  public async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    try {
      const audioSource = this.audioContext.createBufferSource();
      const decodedAudio = await this.audioContext.decodeAudioData(audioBuffer);

      audioSource.buffer = decodedAudio;
      audioSource.connect(this.audioContext.destination);
      audioSource.start(0);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }
}

export default AIService;
