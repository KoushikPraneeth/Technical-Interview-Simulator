package com.koushik.techInterviewSim.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;
    private boolean success;
    private String message;

    // Constructor for successful authentication
    public static AuthResponse success(String token, Long id, String username, String email, Set<String> roles) {
        return AuthResponse.builder()
                .success(true)
                .token(token)
                .id(id)
                .username(username)
                .email(email)
                .roles(roles)
                .message("Authentication successful")
                .build();
    }

    // Constructor for failed authentication
    public static AuthResponse failure(String message) {
        return AuthResponse.builder()
                .success(false)
                .message(message)
                .build();
    }
}
