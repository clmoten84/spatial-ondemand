package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.ProductDTO;
import com.maxar.spatialondemand.model.Product;
import com.maxar.spatialondemand.model.ProductGroup;
import com.maxar.spatialondemand.repository.ProductGroupRepo;
import com.maxar.spatialondemand.repository.ProductRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * ProductServiceImpl
 *
 * Implementation class for ProductService business logic interface
 */
@Service
public class ProductServiceImpl implements ProductService {

    private static final Logger LOG = LoggerFactory.getLogger(ProductServiceImpl.class);

    private ModelMapper modelMapper;

    private ProductRepo productRepo;

    private ProductGroupRepo productGroupRepo;

    @Autowired
    public ProductServiceImpl(ModelMapper modelMapper, ProductRepo productRepo, ProductGroupRepo productGroupRepo) {
        this.modelMapper = modelMapper;
        this.productRepo = productRepo;
        this.productGroupRepo = productGroupRepo;
    }

    @Transactional
    @Override
    public ProductDTO save(ProductDTO productDTO) throws ValidationException, IllegalArgumentException,
            EntityNotFoundException {
        // Validate args
        if (productDTO == null) {
            throw new IllegalArgumentException("Product DTO argument cannot be null.");
        }

        // Save
        return this.entityToDto(productRepo.save(this.dtoToEntity(productDTO)));
    }

    @Transactional
    @Override
    public ProductDTO update(ProductDTO productDTO) throws ValidationException, IllegalArgumentException,
            EntityNotFoundException {
        // Validate args
        if (productDTO == null || productDTO.getProductId() == null) {
            throw new IllegalArgumentException("Product DTO or it's ID are null.");
        }

        // Fetch the Product entity referenced by arg DTO to update
        Product entityToUpdate = productRepo.findById(productDTO.getProductId()).orElse(null);

        if (entityToUpdate == null) {
            throw new EntityNotFoundException(String.format("Product with id - %d - not found in DB."));
        }

        // Update entity fields with DTO values and save
        entityToUpdate.setProductName(productDTO.getProductName());
        entityToUpdate.setServiceUrl(productDTO.getServiceUrl());

        ProductGroup productGroup = productGroupRepo.findProductGroupByGroupNameIgnoreCase(productDTO.
                getProductGroupName()).orElse(null);

        if (productGroup == null) {
            throw new IllegalArgumentException("Tried to update Product with Product Group that does not exist.");
        }
        entityToUpdate.setProductGroup(productGroup);
        return this.entityToDto(productRepo.save(entityToUpdate));
    }

    @Transactional
    @Override
    public void deleteById(Integer productId) {
        productRepo.deleteById(productId);
    }

    @Transactional
    @Override
    public ProductDTO findByProductId(Integer productId) throws ValidationException {
        Product entity = productRepo.findById(productId).orElse(null);
        if (entity != null) {
            return this.entityToDto(entity);
        }
        else
            return null;
    }

    @Transactional
    @Override
    public List<ProductDTO> findByProductIdIn(List<Integer> productIds) throws IllegalArgumentException,
            ValidationException {
        if (productIds == null || productIds.isEmpty()) {
            throw new IllegalArgumentException("Product ids list arg cannot be null or empty.");
        }

        List<Product> entities = productRepo.findProductsByProductIdIn(productIds);
        if (entities != null) {
            return entities.stream().map(this::entityToDto).collect(Collectors.toList());
        }
        else
            return null;
    }

    @Transactional
    @Override
    public List<ProductDTO> findByProductName(String productName) throws ValidationException, IllegalArgumentException {
        if (productName == null || productName.isEmpty()) {
            throw new IllegalArgumentException("Product name argument cannot be null or empty.");
        }

        List<Product> entities = productRepo.findProductByProductNameIgnoreCase(productName);
        if (entities != null) {
            return entities.stream().map(this::entityToDto).collect(Collectors.toList());
        }
        else
            return null;
    }

    @Transactional
    @Override
    public List<ProductDTO> findProductsByGroup(String groupName) throws ValidationException, IllegalArgumentException {
        if (groupName == null || groupName.isEmpty()) {
            throw new IllegalArgumentException("Product group name cannot be null or empty.");
        }

        List<Product> entities = productRepo.findProductsByProductGroup_GroupNameIgnoreCase(groupName);
        return entities.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public List<ProductDTO> findProductsByProjectId(Integer projectId) throws ValidationException, IllegalArgumentException {
        if (projectId == null) {
            throw new IllegalArgumentException("Project id argument cannot be null.");
        }

        List<Product> entities = productRepo.findProductsByProjectId(projectId);
        return entities.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public List<ProductDTO> getAllProducts() throws ValidationException {
        List<Product> products = StreamSupport.stream(productRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());

        return products.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    /**
     * Converts argument entity instance to corresponding DTO
     * @param entity
     * @return
     * @throws ValidationException
     */
    private ProductDTO entityToDto(Product entity) throws ValidationException {
        // Validate mapping
        if (modelMapper.getTypeMap(Product.class, ProductDTO.class) == null) {
            modelMapper.createTypeMap(entity, ProductDTO.class);
            modelMapper.validate();
        }

        // Map it
        return modelMapper.map(entity, ProductDTO.class);
    }

    /**
     * Converts argument DTO to corresponding entity instance
     * @param dto
     * @return
     * @throws ValidationException
     */
    private Product dtoToEntity(ProductDTO dto) throws ValidationException, EntityNotFoundException {
        // Validate mapping
        if (modelMapper.getTypeMap(ProductDTO.class, Product.class) == null) {
            modelMapper.createTypeMap(dto, Product.class);
            modelMapper.validate();
        }

        // Map it
        Product productEntity = modelMapper.map(dto, Product.class);
        ProductGroup productGroup = productGroupRepo.findProductGroupByGroupNameIgnoreCase(dto.getProductGroupName()).
                orElse(null);

        if (productGroup != null) {
            productEntity.setProductGroup(productGroup);
        }
        else {
            throw new EntityNotFoundException(String.format("The referenced product group with name - %s - could not be " +
                    "found in database!", dto.getProductGroupName()));
        }

        return productEntity;
    }
}
