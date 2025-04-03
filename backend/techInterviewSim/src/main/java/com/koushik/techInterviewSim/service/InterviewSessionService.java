package com.koushik.techInterviewSim.service;

import com.koushik.techInterviewSim.dto.InterviewSessionDTO;
import com.koushik.techInterviewSim.entity.InterviewSession;
import com.koushik.techInterviewSim.entity.User;
import com.koushik.techInterviewSim.exception.ApiException;
import com.koushik.techInterviewSim.repository.InterviewSessionRepository;
import com.koushik.techInterviewSim.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewSessionService {

    private final InterviewSessionRepository sessionRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<InterviewSessionDTO> getAllSessions(Pageable pageable) {
        return sessionRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    @Transactional(readOnly = true)
    public List<InterviewSessionDTO> getUserSessions(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "User not found with id: " + userId,
                    "/api/sessions/user/" + userId
                ));

        return sessionRepository.findByUser(user)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Transactional
    public InterviewSessionDTO startSession(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "User not found with id: " + userId,
                    "/api/sessions/start"
                ));

        // Check if user has an active session
        sessionRepository.findByUserAndStatus(user, InterviewSession.InterviewStatus.IN_PROGRESS)
                .ifPresent(session -> {
                    throw new ApiException(
                        HttpStatus.BAD_REQUEST,
                        "User already has an active interview session",
                        "/api/sessions/start"
                    );
                });

        InterviewSession session = InterviewSession.builder()
                .user(user)
                .startTime(LocalDateTime.now())
                .status(InterviewSession.InterviewStatus.IN_PROGRESS)
                .build();

        return convertToDTO(sessionRepository.save(session));
    }

    @Transactional
    public InterviewSessionDTO endSession(Long sessionId) {
        InterviewSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "Session not found with id: " + sessionId,
                    "/api/sessions/" + sessionId + "/end"
                ));

        if (session.getStatus() != InterviewSession.InterviewStatus.IN_PROGRESS) {
            throw new ApiException(
                HttpStatus.BAD_REQUEST,
                "Session is not in progress",
                "/api/sessions/" + sessionId + "/end"
            );
        }

        session.setEndTime(LocalDateTime.now());
        session.setStatus(InterviewSession.InterviewStatus.COMPLETED);

        return convertToDTO(sessionRepository.save(session));
    }

    @Transactional
    public InterviewSessionDTO cancelSession(Long sessionId) {
        InterviewSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "Session not found with id: " + sessionId,
                    "/api/sessions/" + sessionId + "/cancel"
                ));

        if (session.getStatus() != InterviewSession.InterviewStatus.IN_PROGRESS) {
            throw new ApiException(
                HttpStatus.BAD_REQUEST,
                "Session is not in progress",
                "/api/sessions/" + sessionId + "/cancel"
            );
        }

        session.setEndTime(LocalDateTime.now());
        session.setStatus(InterviewSession.InterviewStatus.CANCELLED);

        return convertToDTO(sessionRepository.save(session));
    }

    private InterviewSessionDTO convertToDTO(InterviewSession session) {
        return InterviewSessionDTO.builder()
                .id(session.getId())
                .userId(session.getUser().getId())
                .username(session.getUser().getUsername())
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .status(session.getStatus())
                .duration(calculateDuration(session))
                .build();
    }

    private Long calculateDuration(InterviewSession session) {
        if (session.getStartTime() == null) {
            return null;
        }

        LocalDateTime end = session.getEndTime() != null ? 
                          session.getEndTime() : 
                          LocalDateTime.now();

        return java.time.Duration.between(session.getStartTime(), end).toMinutes();
    }
}
