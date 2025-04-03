package com.koushik.techInterviewSim.repository;

import com.koushik.techInterviewSim.entity.InterviewSession;
import com.koushik.techInterviewSim.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {

    // Find all sessions for a specific user
    List<InterviewSession> findByUser(User user);

    // Find all sessions for a user with pagination
    Page<InterviewSession> findByUser(User user, Pageable pageable);

    // Find active session for a user
    Optional<InterviewSession> findByUserAndStatus(User user, InterviewSession.InterviewStatus status);

    // Find sessions between date range
    List<InterviewSession> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);

    // Find sessions by status
    List<InterviewSession> findByStatus(InterviewSession.InterviewStatus status);

    // Find most recent session for a user
    Optional<InterviewSession> findFirstByUserOrderByStartTimeDesc(User user);
}
