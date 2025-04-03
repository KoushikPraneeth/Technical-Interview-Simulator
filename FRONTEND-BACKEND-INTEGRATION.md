# Frontend-Backend Integration with Supabase

This guide explains how to integrate the frontend and backend using Supabase for authentication and database access.

## Overview

The application uses:
- **Supabase** for authentication and database storage
- **Groq** for AI functionality (on the frontend)
- **Spring Boot** for the backend API

## Authentication Flow

1. User signs up or logs in using the frontend Supabase client
2. Supabase returns a JWT token
3. Frontend includes this token in the Authorization header for API requests
4. Backend verifies the token using the Supabase JWT secret
5. If valid, the backend creates a Spring Security authentication context

## Setup Steps

### 1. Configure Supabase Project

Follow the instructions in `SUPABASE-SETUP.md` to set up your Supabase project.

### 2. Configure Frontend

The frontend is already configured to use Supabase for authentication. Make sure:

1. The Supabase URL and API key are correct in `frontend/src/integrations/supabase/client.ts`
2. API calls include the Supabase JWT token in the Authorization header

Example of making an authenticated API call:

```typescript
import { supabaseClient } from '@/lib/supabase';

const fetchUserData = async () => {
  const { data: { session } } = await supabaseClient.auth.getSession();
  
  if (!session) {
    throw new Error('Not authenticated');
  }
  
  const response = await fetch('http://localhost:8080/api/user/profile', {
    headers: {
      'Authorization': `Bearer ${session.access_token}`
    }
  });
  
  return response.json();
};
```

### 3. Configure Backend

The backend is already configured to use Supabase for authentication. Make sure:

1. The Supabase JWT secret is correctly set in your `.env` file
2. The database connection details are correct

Create a `.env` file in the `backend/techInterviewSim` directory with:

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

### 4. User Management

When a user signs up through Supabase, you need to create a corresponding user record in your backend database:

1. Create a webhook in Supabase that triggers when a user signs up
2. The webhook should call your backend API to create a user record
3. Alternatively, create the user record on first login

Example webhook endpoint in your backend:

```java
@RestController
@RequestMapping("/api/webhooks")
public class WebhookController {

    private final UserService userService;
    
    @PostMapping("/user-created")
    public ResponseEntity<String> handleUserCreated(@RequestBody Map<String, Object> payload) {
        // Verify webhook signature (recommended)
        
        // Extract user data
        String userId = (String) payload.get("user_id");
        String email = (String) payload.get("email");
        
        // Create user in your database
        userService.createUser(userId, email);
        
        return ResponseEntity.ok("User created");
    }
}
```

### 5. Database Access

The backend uses JPA/Hibernate to access the Supabase PostgreSQL database:

1. Entity classes map to database tables
2. Repository interfaces provide data access methods
3. Service classes implement business logic

Example entity:

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    private String id; // Supabase user ID
    
    private String email;
    private String username;
    
    // Getters and setters
}
```

### 6. Testing the Integration

1. Start the backend: `cd backend/techInterviewSim && ./mvnw spring-boot:run`
2. Start the frontend: `cd frontend && npm run dev`
3. Sign up or log in through the frontend
4. Try accessing a protected API endpoint

## Troubleshooting

### CORS Issues

If you encounter CORS issues:

1. Check the CORS configuration in `SecurityConfig.java`
2. Make sure the allowed origins include your frontend URL
3. Verify that the necessary headers are allowed

### Authentication Issues

If authentication fails:

1. Check the JWT token in the browser's network tab
2. Verify that the token is being sent in the Authorization header
3. Check the Supabase JWT secret in your backend configuration
4. Look for authentication errors in the backend logs

### Database Issues

If database connections fail:

1. Verify the database connection details
2. Check that your IP is allowed in Supabase's Database settings
3. Make sure the database user has the necessary permissions
