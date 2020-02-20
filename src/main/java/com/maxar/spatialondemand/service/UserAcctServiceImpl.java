package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.RoleDTO;
import com.maxar.spatialondemand.dto.UserAcctDTO;
import com.maxar.spatialondemand.exceptions.EmailValidationException;
import com.maxar.spatialondemand.exceptions.EntityNotFoundException;
import com.maxar.spatialondemand.exceptions.PasswordValidationException;
import com.maxar.spatialondemand.model.Role;
import com.maxar.spatialondemand.model.UserAcct;
import com.maxar.spatialondemand.repository.RoleRepo;
import com.maxar.spatialondemand.repository.UserAcctRepo;
import com.maxar.spatialondemand.security.RolesEnum;
import com.maxar.spatialondemand.util.EmailValidator;
import com.maxar.spatialondemand.util.PasswordValidator;
import org.modelmapper.ModelMapper;
import org.modelmapper.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * UserAcctServiceImpl
 *
 * Implements UserAcctService business interface
 */
@Service
public class UserAcctServiceImpl implements UserAcctService {

    private static final Logger LOG = LoggerFactory.getLogger(UserAcctServiceImpl.class);

    private ModelMapper mapper;
    private UserAcctRepo userAcctRepo;
    private RoleRepo roleRepo;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserAcctServiceImpl(ModelMapper mapper, UserAcctRepo userAcctRepo,
                               RoleRepo roleRepo, PasswordEncoder passwordEncoder) {
        this.mapper = mapper;
        this.userAcctRepo = userAcctRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public UserAcctDTO save(UserAcctDTO userAcctDTO) throws IllegalArgumentException, ValidationException,
        EmailValidationException, PasswordValidationException {
        // Validate args
        if (userAcctDTO == null) {
            throw new IllegalArgumentException("User account DTO cannot be null");
        }

        // Validate user account data correctness
        if (userAcctDTO.getUsername() != null) {
            if (!EmailValidator.validate(userAcctDTO.getUsername()))
                throw new EmailValidationException("Provided email is invalid", userAcctDTO.getUsername());
        }

        if (userAcctDTO.getPassword() != null) {
            if (!PasswordValidator.validate(userAcctDTO.getPassword()))
                throw new PasswordValidationException("Provided password does not meet minimum requirements.");
            else
                userAcctDTO.setPassword(this.passwordEncoder.encode(userAcctDTO.getPassword()));
        }

        // Convert arg DTO into an entity
        UserAcct entity = this.dtoToEntity(userAcctDTO);

        // Clear the list of Roles attached to DTO - need to do this before adding attached
        // Role entities to UserAcct entity.
        entity.getRoles().clear();

        // Fetch Roles from UserAcctDTO and add the attached Roles to UserAcct entity
        if (userAcctDTO.getRoles() != null) {
            if (userAcctDTO.getRoles().isEmpty()) {
                // Assign role 'USER' by default if no roles are specified
                Role roleEntity = roleRepo.findRoleByRoleNameIgnoreCase(RolesEnum.USER.toString());
                if (roleEntity != null)
                    entity.addRole(roleEntity);
                else
                    throw new EntityNotFoundException(String.format("Role (%s) could not be found in data store.",
                            RolesEnum.USER.toString()));
            }
            else {
                // Loop through roles defined in DTO and add to user
                for (RoleDTO roleDTO : userAcctDTO.getRoles()) {
                    Role roleEntity = roleRepo.findRoleByRoleNameIgnoreCase(roleDTO.getRoleName());
                    if (roleEntity != null)
                        entity.addRole(roleEntity);
                    else
                        throw new EntityNotFoundException(String.format("Role (%s) could not be found in data store.",
                                roleDTO.getRoleName()));
                }
            }
        }

        return this.entityToDTO(this.userAcctRepo.save(entity));
    }

    @Override
    @Transactional
    public UserAcctDTO update(UserAcctDTO userAcctDTO) throws IllegalArgumentException, ValidationException,
            EntityNotFoundException {
        //TODO: implement UserAcct update
        return null;
    }

    @Override
    @Transactional
    public void deleteUserAcctById(UUID id) throws IllegalArgumentException, EmptyResultDataAccessException {
        if (id == null) {
            throw new IllegalArgumentException("UUID arg cannot be null.");
        }

        userAcctRepo.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteUserAcctByUsername(String userName) throws IllegalArgumentException,
            EmptyResultDataAccessException {
        // Validate args
        if (userName == null || userName.isEmpty()) {
            throw new IllegalArgumentException("User name arg cannot be null or empty.");
        }

        userAcctRepo.deleteUserAcctByUsername(userName);
    }

    @Override
    @Transactional
    public UserAcctDTO findByUsername(String username) throws IllegalArgumentException, ValidationException {
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username arg cannot be null or empty.");
        }

        UserAcct entity = userAcctRepo.findUserAcctByUsername(username);
        if (entity != null)
            return this.entityToDTO(entity);
        else
            return null;
    }

    @Override
    @Transactional
    public UserAcctDTO findByEmail(String email) throws IllegalArgumentException, ValidationException {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email arg cannot be null or empty.");
        }

        UserAcct entity = userAcctRepo.findUserAcctByEmail(email);
        if (entity != null)
            return this.entityToDTO(entity);
        else
            return null;
    }

    @Override
    @Transactional
    public List<UserAcctDTO> findUserAcctsByRole(String roleName) throws IllegalArgumentException, ValidationException {
        if (roleName == null || roleName.isEmpty()) {
            throw new IllegalArgumentException("Role name arg cannot be null or empty.");
        }

        List<UserAcct> entities = userAcctRepo.findUsersAcctsByRole(roleName);
        return entities.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<UserAcctDTO> fetchAllAdminAccts() throws ValidationException {
        List<UserAcct> entities = userAcctRepo.findUserAcctsByAdminTrue();
        return entities.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<UserAcctDTO> fetchAllAccts() throws ValidationException {
        List<UserAcct> entities = StreamSupport.stream(userAcctRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return entities.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public long count() {
        return userAcctRepo.count();
    }

    /**
     * Converts UserAcct entity to DTO
     * @param entity
     * @return
     * @throws ValidationException
     */
    private UserAcctDTO entityToDTO(UserAcct entity) throws ValidationException {
        // Validate mapping
        if (mapper.getTypeMap(UserAcct.class, UserAcctDTO.class) == null) {
            mapper.createTypeMap(UserAcct.class, UserAcctDTO.class);
            mapper.validate();
        }

        // Map it
        return mapper.map(entity, UserAcctDTO.class);
    }

    /**
     * Converts UserAcctDTO to UserAcct entity
     * @param dto
     * @return
     * @throws ValidationException
     */
    private UserAcct dtoToEntity(UserAcctDTO dto) throws ValidationException {
        // Validate mapping
        if (mapper.getTypeMap(UserAcctDTO.class, UserAcct.class) == null) {
            mapper.createTypeMap(UserAcctDTO.class, UserAcct.class);
            mapper.validate();
        }

        // Map it
        return mapper.map(dto, UserAcct.class);
    }
}
