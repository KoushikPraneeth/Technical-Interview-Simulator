package com.koushik.techInterviewSim.controller;

import com.koushik.techInterviewSim.dto.auth.LoginRequest;
import com.koushik.techInterviewSim.dto.auth.RegisterRequest;
import com.koushik.techInterviewSim.entity.User;
import com.koushik.techInterviewSim.repository.UserRepository;
import com.koushik.techInterviewSim.util.TestUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    void register_WithValidRequest_ShouldReturnToken() throws Exception {
        // Given
        RegisterRequest request = TestUtils.createTestRegisterRequest();

        // When
        ResultActions result = mockMvc.perform(TestUtils.jsonRequest(
            post("/api/auth/register"), request));

        // Then
        result.andExpect(status().isOk())
              .andExpect(jsonPath("$.token").exists())
              .andExpect(jsonPath("$.success").value(true))
              .andExpect(jsonPath("$.username").value(request.getUsername()))
              .andExpect(jsonPath("$.email").value(request.getEmail()));
    }

    @Test
    void register_WithExistingUsername_ShouldReturnBadRequest() throws Exception {
        // Given
        User existingUser = TestUtils.createTestUser();
        existingUser.setPassword(passwordEncoder.encode(existingUser.getPassword()));
        userRepository.save(existingUser);

        RegisterRequest request = TestUtils.createTestRegisterRequest();

        // When
        ResultActions result = mockMvc.perform(TestUtils.jsonRequest(
            post("/api/auth/register"), request));

        // Then
        result.andExpect(status().isBadRequest());
    }

    @Test
    void login_WithValidCredentials_ShouldReturnToken() throws Exception {
        // Given
        User user = TestUtils.createTestUser();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        LoginRequest request = new LoginRequest(user.getUsername(), "password123");

        // When
        ResultActions result = mockMvc.perform(TestUtils.jsonRequest(
            post("/api/auth/login"), request));

        // Then
        result.andExpect(status().isOk())
              .andExpect(jsonPath("$.token").exists())
              .andExpect(jsonPath("$.success").value(true))
              .andExpect(jsonPath("$.username").value(user.getUsername()))
              .andExpect(jsonPath("$.email").value(user.getEmail()));
    }

    @Test
    void login_WithInvalidCredentials_ShouldReturnUnauthorized() throws Exception {
        // Given
        LoginRequest request = new LoginRequest("wronguser", "wrongpass");

        // When
        ResultActions result = mockMvc.perform(TestUtils.jsonRequest(
            post("/api/auth/login"), request));

        // Then
        result.andExpect(status().isUnauthorized());
    }
}
