package com.maxar.spatialondemand.exceptions;

import java.io.Serializable;

/**
 * PasswordValidationException
 *
 * Exception thrown when a password provided during user creation or update is not valid
 */
public class PasswordValidationException extends RuntimeException implements Serializable {

    private static final long serialVersionUID = 1L;

    public PasswordValidationException(String message) {
        super(message);
    }

    public PasswordValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
