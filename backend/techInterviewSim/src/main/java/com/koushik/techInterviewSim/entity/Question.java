package com.koushik.techInterviewSim.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT") // Use TEXT for potentially long questions
    private String text;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionDifficulty difficulty;

    // Enum for Question Category
    public enum QuestionCategory {
        ALGORITHM,
        DATA_STRUCTURE,
        SYSTEM_DESIGN,
        BEHAVIORAL,
        DATABASE,
        NETWORKING,
        OPERATING_SYSTEM
        // Add more categories as needed
    }

    // Enum for Question Difficulty
    public enum QuestionDifficulty {
        EASY,
        MEDIUM,
        HARD
    }
}
