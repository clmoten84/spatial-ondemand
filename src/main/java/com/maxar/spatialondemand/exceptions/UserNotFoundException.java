package com.maxar.spatialondemand.exceptions;

import lombok.Getter;

import java.io.Serializable;

/**
 * UserNotFoundException
 *
 * Exception thrown when a requested user cannot be found in data store
 */
public class UserNotFoundException extends RuntimeException implements Serializable {

    private static final long serialVersionUID = 1L;

    @Getter
    private String errUsername;

    public UserNotFoundException(String message, String errUsername) {
        super(message);
        this.errUsername = errUsername;
    }

    public UserNotFoundException(String message, String errUsername, Throwable cause) {
        super(message, cause);
        this.errUsername = errUsername;
    }
}
