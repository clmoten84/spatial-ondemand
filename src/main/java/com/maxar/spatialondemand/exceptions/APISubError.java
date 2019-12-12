package com.maxar.spatialondemand.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Abstract API Sub error
 */
abstract class APISubError {

}

/**
 * APIValidationError
 *
 * Expresses validation problems encountered during REST request execution
 */
@Data
@EqualsAndHashCode(callSuper = false)
class APIValidationError extends APISubError {
    private String object;
    private String field;
    private Object rejectedValue;
    private String message;

    public APIValidationError(String object, String message) {
        this.object = object;
        this.message = message;
    }
}

/**
 * APISimpleError
 *
 * Expresses generic problems encountered during REST request execution
 */
class APISimpleError extends APISubError {
    private String message;

    public APISimpleError(String message) {
        this.message = message;
    }
}