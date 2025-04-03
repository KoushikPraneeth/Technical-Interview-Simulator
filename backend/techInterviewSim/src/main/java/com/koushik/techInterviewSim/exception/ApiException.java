package com.koushik.techInterviewSim.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
public class ApiException extends RuntimeException {
    
    private final HttpStatus status;
    private final String message;
    private final LocalDateTime timestamp;
    private final String path;
    private final Object details;

    public ApiException(HttpStatus status, String message, String path) {
        this(status, message, path, null);
    }

    public ApiException(HttpStatus status, String message, String path, Object details) {
        super(message);
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
        this.path = path;
        this.details = details;
    }

    public static ApiException badRequest(String message, String path) {
        return new ApiException(HttpStatus.BAD_REQUEST, message, path);
    }

    public static ApiException notFound(String message, String path) {
        return new ApiException(HttpStatus.NOT_FOUND, message, path);
    }

    public static ApiException unauthorized(String message, String path) {
        return new ApiException(HttpStatus.UNAUTHORIZED, message, path);
    }

    public static ApiException forbidden(String message, String path) {
        return new ApiException(HttpStatus.FORBIDDEN, message, path);
    }

    public static ApiException internal(String message, String path) {
        return new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, message, path);
    }
}
