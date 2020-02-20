package com.maxar.spatialondemand.repository;

import com.maxar.spatialondemand.model.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

/**
 * RoleRepo
 *
 * Data repository for persisting Role domain models
 */
public interface RoleRepo extends CrudRepository<Role, UUID> {
    /**
     * Fetch Role record by name
     * @param roleName
     * @return
     */
    Role findRoleByRoleNameIgnoreCase(String roleName);

    /**
     * Delete a Role record by name
     * @param roleName
     */
    void deleteRoleByRoleNameIgnoreCase(String roleName);
}
