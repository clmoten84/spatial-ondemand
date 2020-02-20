package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.RoleDTO;
import org.modelmapper.ValidationException;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.List;
import java.util.UUID;

/**
 * RoleService
 *
 * Defines business logic methods for Role domain model
 */
public interface RoleService {

    /**
     * Saves a new Role record
     * @param roleDTO
     * @return
     * @throws IllegalArgumentException
     * @throws ValidationException
     */
    RoleDTO save(RoleDTO roleDTO) throws IllegalArgumentException, ValidationException;

    /**
     * Deletes an existing Role record by id
     * @param id
     * @return
     * @throws IllegalArgumentException
     */
    void deleteById(UUID id) throws IllegalArgumentException, EmptyResultDataAccessException;

    /**
     * Deletes an existing Role record by name
     * @param roleName
     * @throws IllegalArgumentException
     */
    void deleteByName(String roleName) throws IllegalArgumentException, EmptyResultDataAccessException;

    /**
     * Fetch a Role record using arg id
     * @param id
     * @return
     */
    RoleDTO findRoleById(UUID id) throws IllegalArgumentException, ValidationException;

    /**
     * Fetch a Role record using arg role name
     * @param roleName
     * @return
     * @throws IllegalArgumentException
     * @throws ValidationException
     */
    RoleDTO findRoleByName(String roleName) throws IllegalArgumentException, ValidationException;

    /**
     * Get a list of all Role records
     * @return
     * @throws ValidationException
     */
    List<RoleDTO> getAllRoles() throws ValidationException;
}
