package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.ProductGroupDTO;
import com.maxar.spatialondemand.model.ProductGroup;
import com.maxar.spatialondemand.repository.ProductGroupRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * ProductGroupServiceImpl
 *
 * Implementation class for ProductGroupService business logic interface
 */
@Service
public class ProductGroupServiceImpl implements ProductGroupService {

    private static final Logger LOG = LoggerFactory.getLogger(ProductGroupServiceImpl.class);

    private ModelMapper modelMapper;

    private ProductGroupRepo productGroupRepo;

    @Autowired
    public ProductGroupServiceImpl(ModelMapper modelMapper, ProductGroupRepo productGroupRepo) {
        this.modelMapper = modelMapper;
        this.productGroupRepo = productGroupRepo;
    }

    /**
     * Save a new ProductGroup instance
     * @param productGroupDTO
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     */
    @Transactional
    @Override
    public ProductGroupDTO save(ProductGroupDTO productGroupDTO) throws ValidationException, IllegalArgumentException {
        // Validate args
        if (productGroupDTO == null) {
            throw new IllegalArgumentException("Product group DTO argument cannot be null.");
        }

        // Save
        return this.entityToDto(productGroupRepo.save(this.dtoToEntity(productGroupDTO)));
    }

    /**
     * Update an existing ProductGroup instance
     * @param productGroupDTO
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     * @throws EntityNotFoundException
     */
    @Transactional
    @Override
    public ProductGroupDTO update(ProductGroupDTO productGroupDTO) throws ValidationException, IllegalArgumentException,
            EntityNotFoundException {
        // Validate args
        if (productGroupDTO == null || productGroupDTO.getGroupId() == null) {
            throw new IllegalArgumentException("Product Group DTO or it's ID are null.");
        }

        // Fetch ProductGroup entity to update
        ProductGroup entityToUpdate = productGroupRepo.findById(productGroupDTO.getGroupId()).orElse(null);

        if (entityToUpdate == null) {
            throw new EntityNotFoundException(String.format("Product Group with id - %d - not found in DB.",
                    productGroupDTO.getGroupId()));
        }

        // Update fields in entity using arg DTO
        entityToUpdate.setGroupName(productGroupDTO.getGroupName());
        return this.entityToDto(productGroupRepo.save(entityToUpdate));
    }

    @Transactional
    @Override
    public void delete(Integer groupId) {
        productGroupRepo.deleteById(groupId);
    }

    /**
     * Fetch a ProductGroup instance using argument group id as filter
     * @param groupId
     * @return
     * @throws ValidationException
     */
    @Transactional
    @Override
    public ProductGroupDTO findByGroupId(Integer groupId) throws ValidationException {
        ProductGroup entity = productGroupRepo.findById(groupId).orElse(null);
        if (entity != null) {
            return this.entityToDto(entity);
        }
        else
            return null;
    }

    /**
     * Fetch a ProductGroup instance using argument group name as filter
     * @param groupName
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     */
    @Transactional
    @Override
    public ProductGroupDTO findByGroupName(String groupName) throws ValidationException, IllegalArgumentException {
        if (groupName == null || groupName.isEmpty()) {
            throw new IllegalArgumentException("Product group name argument cannot be null or empty.");
        }

        ProductGroup entity = productGroupRepo.findProductGroupByGroupNameIgnoreCase(groupName).orElse(null);
        if (entity != null) {
            return this.entityToDto(entity);
        }
        else
            return null;
    }

    /**
     * Fetch a list of all ProductGroup instances in database
     * @return
     * @throws ValidationException
     */
    @Transactional
    @Override
    public List<ProductGroupDTO> getAllGroups() throws ValidationException {
        List<ProductGroup> fetchedEntities = StreamSupport
                .stream(productGroupRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());

        return fetchedEntities.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    /**
     * Converts argument entity to corresponding DTO
     * @param entity
     * @return
     * @throws ValidationException
     */
    private ProductGroupDTO entityToDto(ProductGroup entity) throws ValidationException {
        // Validate mapping
        if (modelMapper.getTypeMap(ProductGroup.class, ProductGroupDTO.class) == null) {
            modelMapper.createTypeMap(ProductGroup.class,
                    ProductGroupDTO.class);
            modelMapper.validate();
        }

        // Map it
        return modelMapper.map(entity, ProductGroupDTO.class);
    }

    /**
     * Converts argument DTO to corresponding entity
     * @param dto
     * @return
     * @throws ValidationException
     */
    private ProductGroup dtoToEntity(ProductGroupDTO dto) throws ValidationException {
        // Validate mapping
        if (modelMapper.getTypeMap(ProductGroupDTO.class, ProductGroup.class) == null) {
            modelMapper.createTypeMap(ProductGroupDTO.class, ProductGroup.class);
            modelMapper.validate();
        }

        // Map it
        return modelMapper.map(dto, ProductGroup.class);
    }
}
