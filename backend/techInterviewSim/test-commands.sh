#!/bin/bash

# Base URL
BASE_URL="http://localhost:8080"

# Note: Get this token from your Supabase frontend after user login
echo "Please paste your Supabase access token:"
read SUPABASE_TOKEN

if [ -z "$SUPABASE_TOKEN" ]; then
    echo "Error: Supabase token is required"
    exit 1
fi

# Test interview chat with OpenAI provider
echo -e "\nTesting interview chat with OpenAI..."
curl -s -X POST "$BASE_URL/api/interview/ai/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_TOKEN" \
  -d '{
    "message": "Tell me about your experience with Java",
    "context": null
  }' | json_pp

# Test interview chat with DeepSeek provider
echo -e "\nTesting interview chat with DeepSeek..."
curl -s -X POST "$BASE_URL/api/interview/ai/chat?provider=DEEPSEEK" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_TOKEN" \
  -d '{
    "message": "What is your understanding of microservices?",
    "context": null
  }' | json_pp

# Test interview chat with Groq provider
echo -e "\nTesting interview chat with Groq..."
curl -s -X POST "$BASE_URL/api/interview/ai/chat?provider=GROQ" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_TOKEN" \
  -d '{
    "message": "Explain the difference between process and thread",
    "context": null
  }' | json_pp

# Test interview feedback
echo -e "\nTesting interview feedback..."
curl -s -X POST "$BASE_URL/api/interview/ai/feedback" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPABASE_TOKEN" \
  -d '{
    "transcript": "Interviewer: Can you explain how HashMap works in Java?\nCandidate: HashMap uses a hash table to store key-value pairs. The hashCode() method is used for generating the hash, and equals() method handles collisions."
  }' | json_pp

# List available AI providers
echo -e "\nListing available AI providers..."
curl -s -X GET "$BASE_URL/api/interview/ai/providers" \
  -H "Authorization: Bearer $SUPABASE_TOKEN" | json_pp

# Health check (no auth required)
echo -e "\nChecking application health..."
curl -s -X GET "$BASE_URL/actuator/health" | json_pp
