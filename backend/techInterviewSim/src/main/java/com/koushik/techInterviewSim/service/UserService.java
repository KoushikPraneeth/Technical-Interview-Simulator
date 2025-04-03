package com.koushik.techInterviewSim.service;

import com.koushik.techInterviewSim.dto.UserDTO;
import com.koushik.techInterviewSim.entity.User;
import com.koushik.techInterviewSim.exception.ApiException;
import com.koushik.techInterviewSim.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "User not found with id: " + id,
                    "/api/users/" + id
                ));
    }

    @Transactional(readOnly = true)
    public UserDTO getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(this::convertToDTO)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "User not found with username: " + username,
                    "/api/users/username/" + username
                ));
    }

    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "User not found with id: " + id,
                    "/api/users/" + id
                ));

        // Update only allowed fields
        if (userDTO.getEmail() != null) {
            user.setEmail(userDTO.getEmail());
        }

        return convertToDTO(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ApiException(
                HttpStatus.NOT_FOUND,
                "User not found with id: " + id,
                "/api/users/" + id
            );
        }
        userRepository.deleteById(id);
    }

    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();
    }
}
