package com.koushik.techInterviewSim.dto;

import com.koushik.techInterviewSim.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private Long id;
    private String text;
    private Question.QuestionCategory category;
    private Question.QuestionDifficulty difficulty;
    
    // Additional fields for frontend display
    private String hint;
    private String solution;
    private String explanation;
    private Integer timeLimit; // Time limit in minutes
    private String[] tags; // Additional tags for categorization
    private String sampleInput;
    private String sampleOutput;
    private String constraints;
    
    // Fields for tracking question statistics
    private Integer timesAsked;
    private Double averageScore;
    private Double successRate;
}
