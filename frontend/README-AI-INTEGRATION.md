# Frontend AI Integration

This project now uses OpenAI directly from the frontend instead of relying on the Spring backend for AI functionality.

## Setup

1. Create a `.env` file in the `frontend` directory (you can copy from `.env.example`)
2. Add your OpenAI API key to the `.env` file:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

## How It Works

The `AIService` class in `frontend/src/services/AIService.ts` now directly communicates with the OpenAI API using the official OpenAI JavaScript SDK. This eliminates the need for the backend to handle AI requests.

### Key Features

- **Direct API Communication**: The frontend communicates directly with OpenAI's API
- **Fallback Mechanisms**: If the API key is missing or API calls fail, the service falls back to mock responses
- **Conversation Context**: The service maintains conversation context for more coherent AI responses
- **Structured Feedback**: AI feedback is structured in a consistent format

### Methods

- `generateResponse(userAnswer, currentQuestion)`: Generates an AI interviewer response
- `generateFeedback(userAnswer, currentQuestion)`: Generates structured feedback on the user's answer
- `getNextQuestion(topic, difficulty)`: Generates a new interview question
- `updateContext(context)`: Updates the conversation context

## Security Considerations

- The OpenAI API key is exposed in the frontend code. In a production environment, you might want to:
  - Use a proxy server to make API calls
  - Implement rate limiting
  - Consider using environment-specific API keys

## Migrating from Backend AI

The backend OpenAI service can be deprecated or removed once the frontend integration is working properly. The endpoints in `InterviewAIController` can be removed or marked as deprecated.

## Troubleshooting

- If you see "OpenAI API key not found" warnings in the console, check that your `.env` file is properly set up
- If API calls fail, the service will automatically fall back to mock responses
- Check browser console for detailed error messages
