package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.ProjectDTO;
import org.modelmapper.ValidationException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

/**
 * ProjectService
 *
 * Defines business logic for Project domain model
 */
public interface ProjectService {

    /**
     * Save a new Project record
     * @param projectDTO
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     */
    ProjectDTO save(ProjectDTO projectDTO) throws ValidationException, IllegalArgumentException;

    /**
     * Update an existing Project record
     * @param projectDTO
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     * @throws EntityNotFoundException
     */
    ProjectDTO update(Integer projectId, ProjectDTO projectDTO) throws ValidationException,
            IllegalArgumentException, EntityNotFoundException;

    /**
     * Delete an existing Project record
     * @param projectDTO
     * @throws IllegalArgumentException
     * @throws EntityNotFoundException
     */
    void delete(Integer projectId) throws EntityNotFoundException, IllegalArgumentException;

    /**
     * Fetch a Project record filtered by id
     * @param projectId
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     */
    ProjectDTO findProjectById(Integer projectId) throws ValidationException, IllegalArgumentException;

    /**
     * Fetch all Project records
     * @return
     * @throws ValidationException
     */
    List<ProjectDTO> fetchAllProjects() throws ValidationException;

    /**
     * Get a count of all Project records
     * @return
     */
    long getProjectCount();
}
