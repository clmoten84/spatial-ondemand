package com.maxar.spatialondemand.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Encapsulates relevant error information when exceptions are encountered during
 * REST request handling.
 */
@Data
public class APIError {
    private HttpStatus httpStatus;

    private LocalDateTime timestamp;

    private String message;

    private String debugMessage;

    private List<APISubError> subErrors;

    private APIError() {
        timestamp = LocalDateTime.now();
    }

    protected APIError(HttpStatus httpStatus) {
        this();
        this.httpStatus = httpStatus;
    }

    protected APIError(HttpStatus httpStatus, Throwable ex) {
        this();
        this.httpStatus = httpStatus;
        this.message = "Unexpected error";
        this.debugMessage = ex.getLocalizedMessage();
    }

    protected APIError(HttpStatus httpStatus, String message, Throwable ex) {
        this();
        this.httpStatus = httpStatus;
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }
}
