package com.maxar.spatialondemand.exceptions;

import org.modelmapper.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.stream.Collectors;

/**
 * RestExceptionHandler
 *
 * Provides custom error handling for a number of exceptions that could occur
 * during execution of REST requests by REST controllers in application.
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice(basePackages = "com.maxar.spatialondemand.controllers.rest")
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger LOG = LoggerFactory.getLogger(RestExceptionHandler.class);

    /**
     * Builds a ResponseEntity instance from an ApiError instance
     * @param apiError ApiError instance to include in ResponseEntity
     * @return ResponseEntity instance
     */
    private ResponseEntity<Object> buildResponseEntity(APIError apiError) {
        return new ResponseEntity<>(apiError, apiError.getHttpStatus());
    }

    /**
     * Handles malformed JSON data in requests made to REST controllers
     * @param ex
     * @param headers
     * @param httpStatus
     * @param req
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus httpStatus,
                                                                  WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        String message = "Malformed JSON data in request";
        return buildResponseEntity(new APIError(HttpStatus.BAD_REQUEST, message, ex));
    }

    /**
     * Handles REST requests with missing required path variables
     * @param ex
     * @param headers
     * @param httpStatus
     * @param req
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleMissingPathVariable(MissingPathVariableException ex,
                                                               HttpHeaders headers,
                                                               HttpStatus httpStatus,
                                                               WebRequest req) {
        LOG.error(ex.getLocalizedMessage());
        String message = String.format("Missing variable in path - %s", ex.getVariableName());
        return buildResponseEntity(new APIError(HttpStatus.BAD_REQUEST, message, ex));
    }

    /**
     * Handles REST request made with unsupported media types
     * @param ex
     * @param headers
     * @param httpStatus
     * @param req
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex,
                                                                 HttpHeaders headers,
                                                                 HttpStatus httpStatus,
                                                                 WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        StringBuilder builder = new StringBuilder();
        builder.append(ex.getContentType());
        builder.append(" media type is not supported for API request. Supported media types are ");
        ex.getSupportedMediaTypes().forEach(t -> builder.append(t).append("\n"));
        return buildResponseEntity(new APIError(HttpStatus.UNSUPPORTED_MEDIA_TYPE, builder.toString(), ex));
    }

    /**
     * Handles REST request made with a media type that is not acceptable
     * @param ex
     * @param headers
     * @param httpStatus
     * @param req
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotAcceptable(HttpMediaTypeNotAcceptableException ex,
                                                                      HttpHeaders headers,
                                                                      HttpStatus httpStatus,
                                                                      WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        StringBuilder builder = new StringBuilder();
        builder.append("Media type is not acceptable for API request. Supported media types are ");
        ex.getSupportedMediaTypes().forEach(t -> builder.append(t).append("\n"));
        return buildResponseEntity(new APIError(HttpStatus.UNSUPPORTED_MEDIA_TYPE, builder.toString(), ex));
    }

    /**
     * Handles REST request made with unsupported method type
     * @param ex
     * @param headers
     * @param httpStatus
     * @param req
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
                                                                         HttpHeaders headers,
                                                                         HttpStatus httpStatus,
                                                                         WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        StringBuilder builder = new StringBuilder();
        builder.append(ex.getMethod());
        builder.append(" method is not supported for API request. Supported method types are ");
        ex.getSupportedHttpMethods().forEach(t -> builder.append(t).append(" "));
        return buildResponseEntity(new APIError(HttpStatus.METHOD_NOT_ALLOWED, builder.toString(), ex));
    }

    /**
     * Handles MissingServletRequestParameter exception
     * @param ex
     * @param headers
     * @param status
     * @param req
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
                                                                          HttpHeaders headers,
                                                                          HttpStatus status,
                                                                          WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        String message = String.format("Required parameter %s of type %s is missing in request.",
                ex.getParameterName(), ex.getParameterType());

        return buildResponseEntity(new APIError(HttpStatus.BAD_REQUEST, message, ex));
    }

    /**
     * Handles NoHandlerFoundException
     * @param ex
     * @param headers
     * @param status
     * @param req
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex,
                                                                   HttpHeaders headers,
                                                                   HttpStatus status,
                                                                   WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        String message = String.format("Handler not found for request %s %s", ex.getHttpMethod(), ex.getRequestURL());
        return buildResponseEntity(new APIError(HttpStatus.NOT_FOUND, message, ex));
    }

    /**
     * Handles IllegalArgumentException
     * @param ex
     * @param req
     * @return
     */
    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        String message = "Invalid request arguments";
        return buildResponseEntity(new APIError(HttpStatus.BAD_REQUEST, message, ex));
    }

    /**
     * Handles exception throw when DTO to Entity mapping validation fails
     * @param ex
     * @param req
     * @return
     */
    @ExceptionHandler(ValidationException.class)
    protected ResponseEntity<Object> handleDTOMappingValidationException(ValidationException ex, WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        String message = "DTO <-> Entity mapping failed to validate";
        APIError error = new APIError(HttpStatus.BAD_REQUEST, message, ex);
        error.setSubErrors(ex.getErrorMessages().stream()
            .map(m -> new APISimpleError(m.getMessage())).collect(Collectors.toList()));
        return buildResponseEntity(error);
    }

    /**
     * Handles exception thrown when an entity expected to be in data store cannot be found in data store
     * @param ex
     * @param req
     * @return
     */
    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFoundException(EntityNotFoundException ex, WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        String message = "Expected entity could not be found in data store";
        return buildResponseEntity(new APIError(HttpStatus.BAD_REQUEST, message, ex));
    }

    /**
     * Serves as a catch-all to handle unexpected exceptions
     * @param ex
     * @param req
     * @return
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleExceptionCatchAll(Exception ex, WebRequest req) {
        LOG.error(ex.getLocalizedMessage(), ex);
        String message = "Unexpected exception encountered";
        return buildResponseEntity(new APIError(HttpStatus.INTERNAL_SERVER_ERROR, message, ex));
    }
}
