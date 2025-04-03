package com.koushik.techInterviewSim.service;

import com.koushik.techInterviewSim.dto.QuestionDTO;
import com.koushik.techInterviewSim.entity.Question;
import com.koushik.techInterviewSim.exception.ApiException;
import com.koushik.techInterviewSim.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Transactional(readOnly = true)
    public Page<QuestionDTO> getAllQuestions(Pageable pageable) {
        return questionRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    @Transactional(readOnly = true)
    public QuestionDTO getQuestionById(Long id) {
        return questionRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "Question not found with id: " + id,
                    "/api/questions/" + id
                ));
    }

    @Transactional(readOnly = true)
    public List<QuestionDTO> getQuestionsByCategory(Question.QuestionCategory category) {
        return questionRepository.findByCategory(category)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<QuestionDTO> getQuestionsByDifficulty(Question.QuestionDifficulty difficulty) {
        return questionRepository.findByDifficulty(difficulty)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Transactional
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Question question = Question.builder()
                .text(questionDTO.getText())
                .category(questionDTO.getCategory())
                .difficulty(questionDTO.getDifficulty())
                .build();
        
        return convertToDTO(questionRepository.save(question));
    }

    @Transactional
    public QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ApiException(
                    HttpStatus.NOT_FOUND,
                    "Question not found with id: " + id,
                    "/api/questions/" + id
                ));

        if (questionDTO.getText() != null) {
            question.setText(questionDTO.getText());
        }
        if (questionDTO.getCategory() != null) {
            question.setCategory(questionDTO.getCategory());
        }
        if (questionDTO.getDifficulty() != null) {
            question.setDifficulty(questionDTO.getDifficulty());
        }

        return convertToDTO(questionRepository.save(question));
    }

    @Transactional
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new ApiException(
                HttpStatus.NOT_FOUND,
                "Question not found with id: " + id,
                "/api/questions/" + id
            );
        }
        questionRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<QuestionDTO> getRandomQuestions(
            Question.QuestionCategory category,
            Question.QuestionDifficulty difficulty,
            int limit) {
        return questionRepository.findRandomQuestions(
                category.name(),
                difficulty.name(),
                limit
            )
            .stream()
            .map(this::convertToDTO)
            .toList();
    }

    private QuestionDTO convertToDTO(Question question) {
        return QuestionDTO.builder()
                .id(question.getId())
                .text(question.getText())
                .category(question.getCategory())
                .difficulty(question.getDifficulty())
                .build();
    }
}
