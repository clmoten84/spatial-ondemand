package com.maxar.spatialondemand.exceptions;

import lombok.Getter;

import java.io.Serializable;

/**
 * UserAlreadyExistsException
 *
 * Exception thrown when an attempt is made to create a user that already exists
 */
public class UserAlreadyExistsException extends RuntimeException implements Serializable {

    private static final long serialVersionUID = 1L;

    @Getter
    private String errUsername;

    public UserAlreadyExistsException(String message, String errUsername) {
        super(message);
        this.errUsername = errUsername;
    }

    public UserAlreadyExistsException(String message, String errUsername, Throwable cause) {
        super(message, cause);
        this.errUsername = errUsername;
    }
}
