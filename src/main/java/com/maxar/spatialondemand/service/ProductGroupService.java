package com.maxar.spatialondemand.service;

import com.maxar.spatialondemand.dto.ProductGroupDTO;
import org.modelmapper.ValidationException;

import javax.persistence.EntityNotFoundException;
import java.util.List;

/**
 * ProductGroupService
 *
 * Defines business logic for ProductGroup domain model
 */
public interface ProductGroupService {
    /**
     * Save a new ProductGroup instance
     * @param productGroupDTO
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     * @throws EntityNotFoundException
     */
    ProductGroupDTO save(ProductGroupDTO productGroupDTO) throws ValidationException, IllegalArgumentException;

    /**
     * Update an existing ProductGroup instance
     * @param productGroupDTO
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     * @throws EntityNotFoundException
     */
    ProductGroupDTO update(ProductGroupDTO productGroupDTO) throws ValidationException, IllegalArgumentException,
            EntityNotFoundException;

    /**
     * Delete an existing ProductGroup instance
     * @param groupId
     */
    void delete(Integer groupId);

    /**
     * Fetch a ProductGroup instance filtered by group id
     * @param groupId
     * @return
     * @throws ValidationException
     */
    ProductGroupDTO findByGroupId(Integer groupId) throws ValidationException;

    /**
     * Fetch a ProductGroup instance filtered by group name
     * @param groupName
     * @return
     * @throws ValidationException
     * @throws IllegalArgumentException
     */
    ProductGroupDTO findByGroupName(String groupName) throws ValidationException, IllegalArgumentException;

    /**
     * Fetch all ProductGroup instances
     * @return
     * @throws ValidationException
     */
    List<ProductGroupDTO> getAllGroups() throws ValidationException;
}
