package com.koushik.techInterviewSim.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.koushik.techInterviewSim.dto.RegisterRequest;
import com.koushik.techInterviewSim.model.User;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

public class TestUtils {

    public static final ObjectMapper objectMapper = new ObjectMapper();
    private static final String TEST_JWT_SECRET = "test-jwt-secret-for-supabase-token-verification";
    private static final String TEST_ISSUER = "https://test-project.supabase.co/auth/v1";

    public static String asJsonString(final Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static MockHttpServletRequestBuilder jsonRequest(MockHttpServletRequestBuilder builder, Object body) {
        return builder
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(asJsonString(body));
    }

    public static String createTestSupabaseToken(String userId) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(TEST_JWT_SECRET);

            Map<String, Object> claims = new HashMap<>();
            claims.put("sub", userId);
            claims.put("role", "authenticated");
            claims.put("email", "test@example.com");

            return JWT.create()
                    .withIssuer(TEST_ISSUER)
                    .withSubject(userId)
                    .withIssuedAt(Date.from(Instant.now()))
                    .withExpiresAt(Date.from(Instant.now().plusSeconds(3600)))
                    .withClaim("aud", "authenticated")
                    .withPayload(claims)
                    .sign(algorithm);
        } catch (Exception e) {
            throw new RuntimeException("Error creating test Supabase token", e);
        }
    }

    public static MockHttpServletRequestBuilder authorizedRequest(
            MockHttpServletRequestBuilder builder,
            String userId) {
        String token = createTestSupabaseToken(userId);
        return builder.header("Authorization", "Bearer " + token);
    }

    public static MockHttpServletRequestBuilder authorizedJsonRequest(
            MockHttpServletRequestBuilder builder,
            String userId,
            Object body) {
        return authorizedRequest(jsonRequest(builder, body), userId);
    }

    /**
     * Creates a test user for authentication tests
     */
    public static User createTestUser() {
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password123");
        return user;
    }

    /**
     * Creates a test registration request for authentication tests
     */
    public static RegisterRequest createTestRegisterRequest() {
        return new RegisterRequest(
            "testuser",
            "test@example.com",
            "password123"
        );
    }
}
