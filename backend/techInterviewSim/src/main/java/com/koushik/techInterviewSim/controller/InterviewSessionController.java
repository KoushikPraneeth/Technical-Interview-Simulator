package com.koushik.techInterviewSim.controller;

import com.koushik.techInterviewSim.dto.InterviewSessionDTO;
import com.koushik.techInterviewSim.service.InterviewSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class InterviewSessionController {

    private final InterviewSessionService sessionService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<InterviewSessionDTO>> getAllSessions(Pageable pageable) {
        return ResponseEntity.ok(sessionService.getAllSessions(pageable));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @userService.getUserById(#userId).username == authentication.name")
    public ResponseEntity<List<InterviewSessionDTO>> getUserSessions(@PathVariable Long userId) {
        return ResponseEntity.ok(sessionService.getUserSessions(userId));
    }

    @PostMapping("/start")
    public ResponseEntity<InterviewSessionDTO> startSession(@RequestParam Long userId) {
        return ResponseEntity.ok(sessionService.startSession(userId));
    }

    @PostMapping("/{sessionId}/end")
    @PreAuthorize("hasRole('ADMIN') or @sessionService.getSessionById(#sessionId).username == authentication.name")
    public ResponseEntity<InterviewSessionDTO> endSession(@PathVariable Long sessionId) {
        return ResponseEntity.ok(sessionService.endSession(sessionId));
    }

    @PostMapping("/{sessionId}/cancel")
    @PreAuthorize("hasRole('ADMIN') or @sessionService.getSessionById(#sessionId).username == authentication.name")
    public ResponseEntity<InterviewSessionDTO> cancelSession(@PathVariable Long sessionId) {
        return ResponseEntity.ok(sessionService.cancelSession(sessionId));
    }
}
