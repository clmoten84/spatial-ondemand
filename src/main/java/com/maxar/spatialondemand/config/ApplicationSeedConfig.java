package com.maxar.spatialondemand.config;

import com.maxar.spatialondemand.dto.RoleDTO;
import com.maxar.spatialondemand.dto.UserAcctDTO;
import com.maxar.spatialondemand.model.Role;
import com.maxar.spatialondemand.model.UserAcct;
import com.maxar.spatialondemand.repository.RoleRepo;
import com.maxar.spatialondemand.repository.UserAcctRepo;
import com.maxar.spatialondemand.security.RolesEnum;
import com.maxar.spatialondemand.service.RoleService;
import com.maxar.spatialondemand.service.UserAcctService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.sql.Timestamp;
import java.util.List;

/**
 * ApplicationSeedConfig
 *
 * Used to populate application database with seed data (i.e. initial roles
 * and admin user(s).
 */
@Component
public class ApplicationSeedConfig {

    private UserAcctService userAcctService;
    private RoleService roleService;

    @Autowired
    public ApplicationSeedConfig(UserAcctService userAcctService, RoleService roleService) {
        this.userAcctService = userAcctService;
        this.roleService = roleService;
    }

    @Value("${default.user}")
    private String defaultUserUsername;

    @Value("${default.pass}")
    private String defaultUserPassword;

    @PostConstruct
    public void seedDB() {
        this.createAppRoles();
        this.createAppDefaultUser();
    }

    /**
     * Creates the application auth roles if they don't exist
     */
    private void createAppRoles() {
        //ADMIN Role
        RoleDTO adminRole = roleService.findRoleByName(RolesEnum.ADMIN.toString());
        if (adminRole == null) {
            adminRole = new RoleDTO();
            adminRole.setRoleName(RolesEnum.ADMIN.toString());
            adminRole.setDateCreated(new Timestamp(new Date().getTime()));
            adminRole.setLastModified(new Timestamp(new Date().getTime()));
            roleService.save(adminRole);
        }

        // USER Role
        RoleDTO userRole = roleService.findRoleByName(RolesEnum.USER.toString());
        if (userRole == null) {
            userRole = new RoleDTO();
            userRole.setRoleName(RolesEnum.USER.toString());
            userRole.setDateCreated(new Timestamp(new Date().getTime()));
            userRole.setLastModified(new Timestamp(new Date().getTime()));
            roleService.save(userRole);
        }
    }

    /**
     * Creates a default ADMIN user if no admin users exist in DB. This seeds the
     * security context with at least one privileged user to generate additional users.
     */
    private void createAppDefaultUser() {
        List<UserAcctDTO> adminUsers = userAcctService.findUserAcctsByRole(
                RolesEnum.ADMIN.toString());
        if (adminUsers.isEmpty()) {
            UserAcctDTO defaultUser = new UserAcctDTO();
            defaultUser.setUsername(this.defaultUserUsername);
            defaultUser.setPassword(this.defaultUserPassword);
            defaultUser.setEmail(this.defaultUserUsername);
            defaultUser.setAdmin(true);
            defaultUser.setDateCreated(new Timestamp(new Date().getTime()));
            defaultUser.setLastModified(new Timestamp(new Date().getTime()));

            RoleDTO roleDTO = new RoleDTO();
            roleDTO.setRoleName(RolesEnum.ADMIN.toString());
            defaultUser.getRoles().add(roleDTO);

            userAcctService.save(defaultUser);
        }
    }
}
