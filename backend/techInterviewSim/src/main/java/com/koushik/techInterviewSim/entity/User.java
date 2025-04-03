package com.koushik.techInterviewSim.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users") // Use plural for table name convention
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER) // Eager fetch roles for security
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    @Builder.Default // Initialize with default value
    private Set<String> roles = new HashSet<>();

    // UserDetails implementation methods

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Convert roles (Strings) to GrantedAuthority objects
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    // Account status methods (implement as needed, default to true for now)
    @Override
    public boolean isAccountNonExpired() {
        return true; // Default to true
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Default to true
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Default to true
    }

    @Override
    public boolean isEnabled() {
        return true; // Default to true
    }
}
