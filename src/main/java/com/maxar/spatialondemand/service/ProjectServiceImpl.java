package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.ProductDTO;
import com.maxar.spatialondemand.dto.ProjectDTO;
import com.maxar.spatialondemand.model.Product;
import com.maxar.spatialondemand.model.Project;
import com.maxar.spatialondemand.repository.ProductRepo;
import com.maxar.spatialondemand.repository.ProjectRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * ProjectServiceImpl
 *
 * Implementation class for ProjectService business logic interface
 */
@Service
public class ProjectServiceImpl implements ProjectService {

    private static final Logger LOG = LoggerFactory.getLogger(ProjectServiceImpl.class);

    private ModelMapper mapper;

    private ProjectRepo projectRepo;

    private ProductRepo productRepo;

    @Autowired
    public ProjectServiceImpl(ModelMapper mapper, ProjectRepo projectRepo, ProductRepo productRepo) {
        this.mapper = mapper;
        this.projectRepo = projectRepo;
        this.productRepo = productRepo;
    }

    @Override
    @Transactional
    public ProjectDTO save(ProjectDTO projectDTO) throws ValidationException, IllegalArgumentException {
        if (projectDTO == null) {
            throw new IllegalArgumentException("Project DTO arg cannot be null.");
        }

        // Need to fetch the product records referenced in the project DTO so they
        // are loaded in the entityManager context.
        List<Product> productEntities = productRepo.findProductsByProductIdIn(projectDTO.getProducts().stream()
            .map(ProductDTO::getProductId).collect(Collectors.toList()));

        // Clear the list of products before attempting to map to entity. We need to do this
        // so that the model mapper does not try to map over a set of transient products in
        // the mapped Project entity. Once mapped, just add each Project reference the entity
        // set.
        projectDTO.getProducts().clear();
        Project entity = this.dtoToEntity(projectDTO);
        productEntities.forEach(entity::addProduct);

        return this.entityToDTO(projectRepo.save(entity));
    }

    @Override
    @Transactional
    public ProjectDTO update(Integer projectId, ProjectDTO projectDTO) throws ValidationException,
            IllegalArgumentException, EntityNotFoundException {
        if (projectId == null) {
            throw new IllegalArgumentException("Project ID cannot be null.");
        }

        if (projectDTO == null) {
            throw new IllegalArgumentException("Project DTO to update arg cannot be null.");
        }

        // Fetch the Project entity to update
        Project entityToUpdate = projectRepo.findById(projectId).orElse(null);
        if (entityToUpdate == null) {
            throw new EntityNotFoundException(String.format("Project with id - %d - not found in DB.",
                    projectId));
        }

        // Update fields in entity using DTO
        // For the time being, you can only update the title and description of a project
        entityToUpdate.setProjectTitle(projectDTO.getProjectTitle());
        entityToUpdate.setProjectDescription(projectDTO.getProjectDescription());
        return this.entityToDTO(projectRepo.save(entityToUpdate));
    }

    @Override
    @Transactional
    public void delete(Integer projectId) throws EntityNotFoundException, IllegalArgumentException {
        if (projectId == null) {
            throw new IllegalArgumentException("Project ID arg cannot be null.");
        }
        projectRepo.deleteById(projectId);
    }

    @Override
    @Transactional
    public ProjectDTO findProjectById(Integer projectId) throws ValidationException, IllegalArgumentException {
        if (projectId == null) {
            throw new IllegalArgumentException("Project ID arg cannot be null.");
        }

        Project entity = projectRepo.findById(projectId).orElse(null);
        if (entity != null)
            return this.entityToDTO(entity);
        else
            return null;
    }

    @Override
    @Transactional
    public List<ProjectDTO> fetchAllProjects() throws ValidationException {
        List<Project> entities = StreamSupport.stream(projectRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return entities.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public long getProjectCount() {
        return projectRepo.count();
    }

    /**
     * Converts the argument Project entity to a DTO instance
     * @param entity
     * @return
     * @throws ValidationException
     */
    private ProjectDTO entityToDTO(Project entity) throws ValidationException {
        // Validate mapping
        if (mapper.getTypeMap(Project.class, ProjectDTO.class) == null) {
            mapper.createTypeMap(Project.class, ProjectDTO.class);
            mapper.validate();
        }

        // Map it
        return mapper.map(entity, ProjectDTO.class);
    }

    /**
     * Converts the argument Project DTO to an entity instance
     * @param dto
     * @return
     * @throws ValidationException
     */
    private Project dtoToEntity(ProjectDTO dto) throws ValidationException {
        // Validate mapping
        if (mapper.getTypeMap(ProjectDTO.class, Project.class) == null) {
            mapper.createTypeMap(ProjectDTO.class, Project.class);
            mapper.validate();
        }

        // Map it
        return mapper.map(dto, Project.class);
    }
}
