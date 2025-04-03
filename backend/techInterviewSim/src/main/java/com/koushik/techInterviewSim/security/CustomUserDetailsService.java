package com.koushik.techInterviewSim.security;

import com.koushik.techInterviewSim.entity.User;
import com.koushik.techInterviewSim.exception.ApiException;
import com.koushik.techInterviewSim.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "User not found with username: " + username,
                    "/api/auth/login"
                ));
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "User not found with id: " + id,
                    "/api/users/" + id
                ));
    }
}
