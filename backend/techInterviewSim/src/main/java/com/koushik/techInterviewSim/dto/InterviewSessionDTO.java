package com.koushik.techInterviewSim.dto;

import com.koushik.techInterviewSim.entity.InterviewSession;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewSessionDTO {
    private Long id;
    private Long userId;
    private String username;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private InterviewSession.InterviewStatus status;
    private String feedback; // Overall session feedback
    private Integer score; // Optional score for the session
    
    // Additional fields that might be needed for the frontend
    private Integer questionCount;
    private Integer completedQuestions;
    private String currentQuestionType;
    private Long duration; // Duration in minutes
}
