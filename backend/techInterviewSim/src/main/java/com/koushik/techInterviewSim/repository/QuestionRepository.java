package com.koushik.techInterviewSim.repository;

import com.koushik.techInterviewSim.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Find questions by category
    List<Question> findByCategory(Question.QuestionCategory category);

    // Find questions by difficulty
    List<Question> findByDifficulty(Question.QuestionDifficulty difficulty);

    // Find questions by category and difficulty
    List<Question> findByCategoryAndDifficulty(
            Question.QuestionCategory category, 
            Question.QuestionDifficulty difficulty
    );

    // Find questions with pagination
    Page<Question> findByCategory(Question.QuestionCategory category, Pageable pageable);

    // Find random questions by category and difficulty
    @Query(value = "SELECT * FROM questions " +
           "WHERE category = :category AND difficulty = :difficulty " +
           "ORDER BY RANDOM() LIMIT :limit", 
           nativeQuery = true)
    List<Question> findRandomQuestions(
            @Param("category") String category,
            @Param("difficulty") String difficulty,
            @Param("limit") int limit
    );

    // Search questions by text containing keyword
    List<Question> findByTextContainingIgnoreCase(String keyword);
}
