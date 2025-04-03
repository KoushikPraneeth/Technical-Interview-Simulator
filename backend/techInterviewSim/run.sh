#!/bin/bash

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp src/main/resources/.env.template .env
    echo "Please update .env with your configuration values before continuing."
    exit 1
fi

# Build and start services
echo "Building and starting services..."
docker-compose up --build -d

# Wait for services to be healthy
echo "Waiting for services to be ready..."
sleep 10

# Check service health
echo "Checking service status..."
docker-compose ps

# Show logs
echo "Showing application logs (Ctrl+C to exit)..."
docker-compose logs -f app
