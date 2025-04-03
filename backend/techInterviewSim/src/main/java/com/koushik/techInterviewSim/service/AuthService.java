package com.koushik.techInterviewSim.service;

import com.koushik.techInterviewSim.dto.auth.AuthResponse;
import com.koushik.techInterviewSim.dto.auth.LoginRequest;
import com.koushik.techInterviewSim.dto.auth.RegisterRequest;
import com.koushik.techInterviewSim.entity.User;
import com.koushik.techInterviewSim.exception.ApiException;
import com.koushik.techInterviewSim.repository.UserRepository;
import com.koushik.techInterviewSim.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if username is already taken
        if (userRepository.existsByUsername(request.getUsername())) {
            throw ApiException.badRequest(
                "Username is already taken",
                "/api/auth/register"
            );
        }

        // Check if email is already registered
        if (userRepository.existsByEmail(request.getEmail())) {
            throw ApiException.badRequest(
                "Email is already registered",
                "/api/auth/register"
            );
        }

        // Create new user
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(new HashSet<>(Set.of("ROLE_USER")))
                .build();

        userRepository.save(user);

        // Generate authentication token
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return AuthResponse.success(
            jwt,
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRoles()
        );
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "User not found with username: " + request.getUsername(),
                    "/api/auth/login"
                ));

        return AuthResponse.success(
            jwt,
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRoles()
        );
    }
}
