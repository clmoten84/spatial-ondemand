package com.maxar.spatialondemand.exceptions;

import java.io.Serializable;

/**
 * EntityNotFoundException
 *
 * Exception thrown when a requested Entity cannot be found in database
 */
public class EntityNotFoundException extends RuntimeException implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * Message only constructor
     * @param message
     */
    public EntityNotFoundException(String message) {
        super(message);
    }

    /**
     * Message and cause constructors
     * @param message
     * @param cause
     */
    public EntityNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
