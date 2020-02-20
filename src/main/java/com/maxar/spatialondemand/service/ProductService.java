package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.ProductDTO;
import org.modelmapper.ValidationException;

import javax.persistence.EntityNotFoundException;
import java.util.List;

/**
 * ProductService
 *
 * Defines business logic for Product domain model
 */
public interface ProductService {
    /**
     * Save a new Product model instance
     * @param productDTO
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     */
    ProductDTO save(ProductDTO productDTO) throws ValidationException, IllegalArgumentException;

    /**
     * Update an existing Product model instance
     * @param productDTO
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     * @throws EntityNotFoundException
     */
    ProductDTO update(ProductDTO productDTO) throws ValidationException, IllegalArgumentException,
            EntityNotFoundException;

    /**
     * Delete a Product model instance by product id
     * @param productId
     */
    void deleteById(Integer productId);

    /**
     * Retrieve a Product model instance using product id
     * @param productId
     * @return
     * @throws ValidationException
     */
    ProductDTO findByProductId(Integer productId) throws ValidationException;

    /**
     * Retrieve a list of Product instances with ids that are in list of arg product ids
     * @param productIds
     * @return
     * @throws IllegalArgumentException
     * @throws ValidationException
     */
    List<ProductDTO> findByProductIdIn(List<Integer> productIds) throws IllegalArgumentException,
            ValidationException;

    /**
     * Retrieve a Product model instance using product name
     * @param productName
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     */
    List<ProductDTO> findByProductName(String productName) throws ValidationException, IllegalArgumentException;

    /**
     * Retrieve list of Product model instances using argument group name
     * @param groupName
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     */
    List<ProductDTO> findProductsByGroup(String groupName) throws ValidationException, IllegalArgumentException;

    /**
     * Retrieve list of Product model instances using argument project id
     * @param projectId
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     */
    List<ProductDTO> findProductsByProjectId(Integer projectId) throws ValidationException, IllegalArgumentException;

    /**
     * Retrieve list of all Product model instances
     * @return
     * @throws ValidationException
     */
    List<ProductDTO> getAllProducts() throws ValidationException;
}
