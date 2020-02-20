package com.maxar.spatialondemand.repository;

import com.maxar.spatialondemand.model.Project;
import org.springframework.data.repository.CrudRepository;

/**
 * ProjectRepo
 *
 * Data repository for persisting Project domain model
 */
public interface ProjectRepo extends CrudRepository<Project, Integer> {
    /**
     * Get a count of all Project records in database
     * @return
     */
    long count();
}
