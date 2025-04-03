# Supabase Setup Guide

This guide will help you set up Supabase for both the frontend and backend of the Technical Interview Simulator.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in or create an account
2. Create a new project
3. Choose a name for your project (e.g., "tech-interview-sim")
4. Set a secure database password
5. Choose a region close to your users
6. Wait for the project to be created (this may take a few minutes)

## 2. Configure Authentication

1. Go to Authentication > Settings
2. Under "Email Auth", make sure "Enable Email Signup" is turned on
3. Configure any other authentication providers you want to use (Google, GitHub, etc.)
4. Go to Authentication > URL Configuration
5. Set the Site URL to your frontend URL (e.g., `http://localhost:5173` for local development)
6. Add any additional redirect URLs if needed

## 3. Get API Keys and Connection Details

### For Frontend

1. Go to Project Settings > API
2. Copy the "Project URL" and "anon" public API key
3. Update these values in `frontend/src/integrations/supabase/client.ts`

### For Backend

1. Go to Project Settings > API
2. Copy the "Project URL" and "JWT Secret"
3. Go to Project Settings > Database
4. Copy the database connection details (host, database name, port, etc.)
5. Create a `.env` file in the `backend/techInterviewSim` directory with the following content:

```
# Supabase Database
SUPABASE_DB_URL=jdbc:postgresql://db.your-project-ref.supabase.co:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-db-password

# Supabase Authentication
SUPABASE_PROJECT_URL=https://your-project-ref.supabase.co
SUPABASE_JWT_SECRET=your-jwt-secret

# JWT Configuration
JWT_SECRET=your-256-bit-secret-key-here-minimum-32-characters
JWT_EXPIRATION=86400000
```

Replace the placeholder values with your actual Supabase details.

## 4. Set Up Database Schema

Supabase uses PostgreSQL, and our Spring Boot application will create the necessary tables automatically using JPA/Hibernate.

However, you can also set up the schema manually if you prefer:

1. Go to Database > SQL Editor
2. Create the necessary tables for your application:

```sql
-- Users table (if not already created by Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add any other tables your application needs
```

## 5. Configure Row-Level Security (RLS)

For security, enable Row-Level Security on your tables:

1. Go to Database > Tables
2. Select a table
3. Go to "Authentication" tab
4. Enable Row-Level Security
5. Create policies to control access to your data

Example policy for users table:
```sql
-- Allow users to read their own data
CREATE POLICY "Users can read their own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid() = id);
```

## 6. Test the Integration

1. Start the backend: `cd backend/techInterviewSim && ./mvnw spring-boot:run`
2. Start the frontend: `cd frontend && npm run dev`
3. Try to sign up, sign in, and use the application features

## Troubleshooting

- If you encounter CORS issues, make sure your Supabase project has the correct Site URL and redirect URLs configured
- If authentication fails, check that the JWT secret is correctly configured in both Supabase and your backend
- If database connections fail, verify the database connection details and make sure your IP is allowed in Supabase's Database settings
