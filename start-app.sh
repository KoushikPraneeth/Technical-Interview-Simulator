#!/bin/bash

# Start the backend
echo "Starting the backend..."
cd backend/techInterviewSim
./mvnw spring-boot:run -DskipTests &
BACKEND_PID=$!

# Wait for the backend to start
echo "Waiting for the backend to start..."
sleep 10

# Start the frontend
echo "Starting the frontend..."
cd ../../frontend
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
function cleanup {
  echo "Stopping the application..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Keep the script running
echo "Application is running. Press Ctrl+C to stop."
wait
