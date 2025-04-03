# Technical Interview Simulator Backend

A Spring Boot application that powers the Technical Interview Simulator platform.

## Prerequisites

- Java 17 or higher
- Docker and Docker Compose
- Access to Supabase project

## Configuration

1. Create a `.env` file in the root directory based on `.env.template`:
   ```bash
   cp .env.template .env
   ```

2. Update the following environment variables in `.env`:
   ```bash
   SUPABASE_DB_PASSWORD=your-db-password
   SUPABASE_PROJECT_URL=your-project-url
   SUPABASE_JWT_SECRET=your-jwt-secret
   ```

3. Optional: Configure AI providers (OpenAI, DeepSeek, Groq) if needed.

## Database Setup

This application uses Supabase PostgreSQL database. No local database setup is required.

The application will automatically:
- Connect to your Supabase PostgreSQL database
- Create necessary tables on startup (using JPA/Hibernate)
- Handle schema migrations

## Running the Application

### Using Docker Compose

1. Build and start the application:
   ```bash
   docker compose up --build
   ```

2. The application will be available at:
   - API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui.html

### Using Local Development Environment

1. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

## Testing

Run the tests using:
```bash
./mvnw test
```

## API Documentation

- OpenAPI documentation is available at `/api-docs`
- Swagger UI is available at `/swagger-ui.html`

## Security

- JWT authentication using Supabase tokens
- Database credentials are managed through environment variables
- All sensitive information should be stored in `.env` (not committed to git)

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
