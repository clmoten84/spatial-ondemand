package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.UserAcctDTO;
import com.maxar.spatialondemand.exceptions.EntityNotFoundException;
import com.maxar.spatialondemand.model.UserAcct;
import org.modelmapper.ValidationException;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.List;
import java.util.UUID;

/**
 * UserAcctService
 *
 * Defines business logic methods for UserAcct domain model
 */
public interface UserAcctService {
    /**
     * Saves a new UserAcct record
     * @param userAcctDTO
     * @return
     * @throws IllegalArgumentException
     * @throws ValidationException
     */
    UserAcctDTO save(UserAcctDTO userAcctDTO) throws IllegalArgumentException, ValidationException;

    /**
     * Updates an existing UserAcct record
     * @param userAcctDTO
     * @return
     * @throws IllegalArgumentException
     * @throws ValidationException
     * @throws EntityNotFoundException
     */
    UserAcctDTO update(UserAcctDTO userAcctDTO) throws IllegalArgumentException, ValidationException,
            EntityNotFoundException;

    /**
     * Deletes an existing UserAcct record by id
     * @param id
     * @throws IllegalArgumentException
     * @throws EntityNotFoundException
     */
    void deleteUserAcctById(UUID id) throws IllegalArgumentException, EmptyResultDataAccessException;

    /**
     * Deletes an existing UserAcct record by username
     * @param userName
     * @throws IllegalArgumentException
     * @throws EntityNotFoundException
     */
    void deleteUserAcctByUsername(String userName) throws IllegalArgumentException, EmptyResultDataAccessException;

    /**
     * Fetch an existing UserAcct record by username
     * @param username
     * @return
     * @throws IllegalArgumentException
     * @throws ValidationException
     */
    UserAcctDTO findByUsername(String username) throws IllegalArgumentException, ValidationException;

    /**
     * Fetch an existing UserAcct record by email
     * @param email
     * @return
     * @throws IllegalArgumentException
     * @throws ValidationException
     */
    UserAcctDTO findByEmail(String email) throws IllegalArgumentException, ValidationException;

    /**
     * Fetch a list of UserAcct records that are assigned the arg role
     * @param roleName
     * @return
     * @throws IllegalArgumentException
     * @throws ValidationException
     */
    List<UserAcctDTO> findUserAcctsByRole(String roleName) throws IllegalArgumentException, ValidationException;

    /**
     * Fetch ALL admin UserAcct records
     * @return
     * @throws ValidationException
     */
    List<UserAcctDTO> fetchAllAdminAccts() throws ValidationException;

    /**
     * Fetch ALL UserAcct records
     * @return
     * @throws ValidationException
     */
    List<UserAcctDTO> fetchAllAccts() throws ValidationException;

    /**
     * Get count of ALL UserAcct records
     * @return
     */
    long count();
}
