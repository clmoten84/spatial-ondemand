package com.maxar.spatialondemand.exceptions;

import lombok.Getter;

import java.io.Serializable;

/**
 * EmailValidationException
 *
 * Exception thrown when an invalid email is input by user
 */
public class EmailValidationException extends RuntimeException implements Serializable {

    private static final long serialVersionUID = 1L;

    @Getter
    private String message;

    @Getter
    private String invalidEmail;

    public EmailValidationException(String message, String invalidEmail) {
        super(message);
        this.invalidEmail = invalidEmail;
    }

    public EmailValidationException(String message, String invalidEmail, Throwable cause) {
        super(message, cause);
        this.invalidEmail = invalidEmail;
    }
}
