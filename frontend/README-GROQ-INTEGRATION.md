# Groq AI Integration

This project now uses Groq AI directly from the frontend for AI functionality, including chat completions, speech-to-text, and text-to-speech capabilities.

## Setup

1. Create a `.env` file in the `frontend` directory (you can copy from `.env.example`)
2. Add your Groq API key to the `.env` file:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```
   Note: The default key is already included in the code for demonstration purposes.

## How It Works

The `AIService` class in `frontend/src/services/AIService.ts` now directly communicates with the Groq API using the Groq SDK. This provides several AI capabilities:

### Key Features

- **Chat Completions**: Using Groq's qwen-qwq-32b model for generating interview responses and feedback
- **Speech-to-Text**: Using Groq's distil-whisper-large-v3-en model for transcribing voice input
- **Text-to-Speech**: Using Groq's playai-tts model with Arista-PlayAI voice for generating speech
- **Fallback Mechanisms**: If the API key is missing or API calls fail, the service falls back to mock responses
- **Conversation Context**: The service maintains conversation context for more coherent AI responses

### Methods

- `generateResponse(userAnswer, currentQuestion)`: Generates an AI interviewer response
- `generateFeedback(userAnswer, currentQuestion)`: Generates structured feedback on the user's answer
- `getNextQuestion(topic, difficulty)`: Generates a new interview question
- `updateContext(context)`: Updates the conversation context
- `speechToText(audioBlob)`: Converts speech to text using Groq's Whisper model
- `textToSpeech(text)`: Converts text to speech using Groq's TTS model
- `playAudio(audioBuffer)`: Plays audio from an ArrayBuffer

## Voice Input

The application now supports voice input for answering interview questions:

1. Click the "Voice" button to activate the microphone
2. Speak your answer
3. Click the "Voice" button again to stop recording
4. The application will automatically transcribe your speech and send it as a message

## Security Considerations

- The Groq API key is exposed in the frontend code. In a production environment, you might want to:
  - Use a proxy server to make API calls
  - Implement rate limiting
  - Consider using environment-specific API keys

## Troubleshooting

- If you see "Groq API key not found" warnings in the console, check that your `.env` file is properly set up
- If API calls fail, the service will automatically fall back to mock responses
- Check browser console for detailed error messages
- For speech-to-text issues, ensure your microphone is working properly and that you've granted the necessary permissions
