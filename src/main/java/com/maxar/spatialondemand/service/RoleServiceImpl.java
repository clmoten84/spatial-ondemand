package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.RoleDTO;
import com.maxar.spatialondemand.model.Role;
import com.maxar.spatialondemand.repository.RoleRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * RoleServiceImpl
 *
 * Implementation of RoleService business interface
 */
@Service
public class RoleServiceImpl implements RoleService {

    private static final Logger LOG = LoggerFactory.getLogger(RoleServiceImpl.class);

    private ModelMapper mapper;
    private RoleRepo roleRepo;

    @Autowired
    public RoleServiceImpl(RoleRepo roleRepo, ModelMapper mapper) {
        this.roleRepo = roleRepo;
        this.mapper = mapper;
    }

    @Override
    @Transactional
    public RoleDTO save(RoleDTO roleDTO) throws IllegalArgumentException, ValidationException {
        // Validate args
        if (roleDTO == null) {
            throw new IllegalArgumentException("Role DTO arg cannot be null.");
        }

        // Convert DTO to entity and save
        Role entity = this.dtoToEntity(roleDTO);
        return this.entityToDTO(roleRepo.save(entity));
    }

    @Override
    @Transactional
    public void deleteById(UUID id) throws IllegalArgumentException, EmptyResultDataAccessException {
        if (id == null) {
            throw new IllegalArgumentException("Role id arg cannot be null.");
        }

        roleRepo.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteByName(String roleName) throws IllegalArgumentException, EmptyResultDataAccessException {
        if (roleName == null || roleName.isEmpty()) {
            throw new IllegalArgumentException("Role name arg cannot be null or empty.");
        }

        roleRepo.deleteRoleByRoleNameIgnoreCase(roleName);
    }

    @Override
    @Transactional
    public RoleDTO findRoleById(UUID id) throws IllegalArgumentException, ValidationException {
        if (id == null) {
            throw new IllegalArgumentException("Role id arg cannot be null.");
        }

        Role entity = roleRepo.findById(id).orElse(null);
        if (entity != null)
            return this.entityToDTO(entity);
        else
            return null;
    }

    @Override
    @Transactional
    public RoleDTO findRoleByName(String roleName) throws IllegalArgumentException, ValidationException {
        if (roleName == null || roleName.isEmpty()) {
            throw new IllegalArgumentException("Role name arg cannot be null or empty.");
        }

        Role entity = roleRepo.findRoleByRoleNameIgnoreCase(roleName);
        if (entity != null)
            return this.entityToDTO(entity);
        else
            return null;
    }

    @Override
    @Transactional
    public List<RoleDTO> getAllRoles() throws ValidationException {
        List<Role> entities = StreamSupport.stream(roleRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return entities.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    /**
     * Convert Role entity into a DTO
     * @param entity
     * @return
     * @throws ValidationException
     */
    private RoleDTO entityToDTO(Role entity) throws ValidationException {
        // Validate mapping
        if (mapper.getTypeMap(Role.class, RoleDTO.class) == null) {
            mapper.createTypeMap(Role.class, RoleDTO.class);
            mapper.validate();
        }

        // Map it
        return mapper.map(entity, RoleDTO.class);
    }

    /**
     * Convert RoleDTO into an entity
     * @param dto
     * @return
     * @throws ValidationException
     */
    private Role dtoToEntity(RoleDTO dto) throws ValidationException {
        // Validate mapping
        if (mapper.getTypeMap(RoleDTO.class, Role.class) == null) {
            mapper.createTypeMap(RoleDTO.class, Role.class);
            mapper.validate();
        }

        // Map it
        return mapper.map(dto, Role.class);
    }
}
