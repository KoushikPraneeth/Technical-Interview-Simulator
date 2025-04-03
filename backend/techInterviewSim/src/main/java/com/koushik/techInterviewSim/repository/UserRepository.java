package com.koushik.techInterviewSim.repository;

import com.koushik.techInterviewSim.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Method to find a user by their username
    Optional<User> findByUsername(String username);

    // Method to find a user by their email
    Optional<User> findByEmail(String email);

    // Method to check if a username exists
    Boolean existsByUsername(String username);

    // Method to check if an email exists
    Boolean existsByEmail(String email);
}
