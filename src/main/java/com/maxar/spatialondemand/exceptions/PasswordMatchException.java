package com.maxar.spatialondemand.exceptions;

import java.io.Serializable;

/**
 * PasswordMatchException
 *
 * Exception thrown when a provided password does not match the corresponding user account
 */
public class PasswordMatchException extends RuntimeException implements Serializable {

    private static final long serialVersionUID = 1L;

    public PasswordMatchException(String message) {
        super(message);
    }

    public PasswordMatchException(String message, Throwable cause) {
        super(message, cause);
    }
}
