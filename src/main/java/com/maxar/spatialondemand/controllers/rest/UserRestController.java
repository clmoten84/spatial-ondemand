package com.maxar.spatialondemand.controllers.rest;

import com.maxar.spatialondemand.dto.RoleDTO;
import com.maxar.spatialondemand.dto.UserAcctDTO;
import com.maxar.spatialondemand.security.UserDetailsImpl;
import com.maxar.spatialondemand.service.RoleService;
import com.maxar.spatialondemand.service.UserAcctService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api")
public class UserRestController {

    private UserAcctService userAcctService;
    private RoleService roleService;

    @Autowired
    public UserRestController(UserAcctService userAcctService, RoleService roleService) {
        this.userAcctService = userAcctService;
        this.roleService = roleService;
    }

    /**
     * Saves a new UserAcct record
     * @param userAcctDTO
     * @return
     */
    @PostMapping(value = "/users",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public UserAcctDTO saveUserAcct(@RequestBody UserAcctDTO userAcctDTO) {
        return userAcctService.save(userAcctDTO);
    }

    /**
     * Deletes an existing UserAcct record by id
     * @param id
     */
    @DeleteMapping(value = "/users/{id}",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteUserAcctById(@PathVariable("id") UUID id) {
        userAcctService.deleteUserAcctById(id);
    }

    @DeleteMapping(value = "/users",
        params = "userIds",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteUserAcctsById(@RequestParam("userIds") String[] userIds) {
        for (String userId : userIds) {
            UUID uuid = UUID.fromString(userId);
            userAcctService.deleteUserAcctById(uuid);
        }
    }

    /**
     * Deletes an existing UserAcct record by username
     * @param username
     */
    @DeleteMapping(value = "/users",
        params = "username",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteUserAcctByUsername(@RequestParam("username") String username) {
        userAcctService.deleteUserAcctByUsername(username);
    }

    @GetMapping(value = "/users",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<UserAcctDTO> fetchAllUserAccts() {
        return userAcctService.fetchAllAccts();
    }

    /**
     * Fetches an existing UserAcct record by username
     * @param username
     * @return
     */
    @GetMapping(value = "/users",
        params = "username",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public UserAcctDTO findUserByUsername(@RequestParam("username") String username) {
        return userAcctService.findByUsername(username);
    }

    /**
     * Fetches an existing UserAcct record by email
     * @param email
     * @return
     */
    @GetMapping(value = "/users",
        params = "email",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public UserAcctDTO findUserByEmail(@RequestParam("email") String email) {
        return userAcctService.findByEmail(email);
    }

    /**
     * Fetches ALL UserAcct records associated with arg role name
     * @param roleName
     * @return
     */
    @GetMapping(value = "/users",
        params = "roleName",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<UserAcctDTO> findUsersByRole(@RequestParam("roleName") String roleName) {
        return userAcctService.findUserAcctsByRole(roleName);
    }

    /**
     * Gets a total count of all UserAcct records
     * @return
     */
    @GetMapping(value = "/users/count",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public long totalUserCount() {
        return userAcctService.count();
    }

    /**
     * Fetches the current logged in user from the implicit authentication token provided to controller
     * @param authentication
     * @return
     */
    @GetMapping(value = "/users/currentUser",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public UserDetailsImpl fetchCurrentLoggedInUser(Authentication authentication) {
        return (UserDetailsImpl) authentication.getPrincipal();
    }

    /**
     * Saves a new Role record
     * @param roleDTO
     * @return
     */
    @PostMapping(value = "/roles",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public RoleDTO saveRole(@RequestBody RoleDTO roleDTO) {
        return roleService.save(roleDTO);
    }

    /**
     * Deletes an existing Role record by id
     * @param id
     */
    @DeleteMapping(value = "/roles/{id}",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteRoleById(@PathVariable("id") UUID id) {
        roleService.deleteById(id);
    }

    /**
     * Deletes each Role record specified in the arg list of role ids
     * @param roleIds
     */
    @DeleteMapping(value = "/roles",
        params = "roleIds",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteRolesById(@RequestParam("roleIds") String[] roleIds) {
        for (String roleId : roleIds) {
            UUID uuid = UUID.fromString(roleId);
            roleService.deleteById(uuid);
        }
    }

    /**
     * Deletes an existing Role record by role name
     * @param roleName
     */
    @DeleteMapping(value = "/roles",
        params = "roleName",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteRoleByName(@RequestParam("roleName") String roleName) {
        roleService.deleteByName(roleName);
    }

    @GetMapping(value = "/roles",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<RoleDTO> fetchAllRoles() {
        return roleService.getAllRoles();
    }
}
