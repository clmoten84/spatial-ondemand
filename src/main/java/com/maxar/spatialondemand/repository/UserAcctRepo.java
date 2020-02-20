package com.maxar.spatialondemand.repository;

import com.maxar.spatialondemand.model.UserAcct;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

/**
 * UserAcctRepo
 *
 * Data repository for persisting UserAcct domain models
 */
public interface UserAcctRepo extends CrudRepository<UserAcct, UUID> {

    /**
     * Fetch UserAcct record with arg username
     * @param username
     * @return
     */
    UserAcct findUserAcctByUsername(String username);

    /**
     * Fetch UserAcct record with arg email
     * @param email
     * @return
     */
    UserAcct findUserAcctByEmail(String email);

    /**
     * Fetch a list of ALL admin UserAcct records
     * @return
     */
    List<UserAcct> findUserAcctsByAdminTrue();

    /**
     * Fetch a list of UserAcct records with arg role
     * @param roleName
     * @return
     */
    @Query("select r.users from Role r where r.roleName = :roleName")
    List<UserAcct> findUsersAcctsByRole(@Param("roleName") String roleName);

    /**
     * Fetch a list of ALL non-admin UserAcct records
     * @return
     */
    List<UserAcct> findUserAcctsByAdminFalse();

    /**
     * Deletes a UserAcct record with arg user name
     * @param userName
     */
    void deleteUserAcctByUsername(String userName);

    /**
     * Get a count of all UserAcct records
     * @return
     */
    long count();
}
