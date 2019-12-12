package com.maxar.spatialondemand.repository;

import com.maxar.spatialondemand.model.ProductGroup;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * ProductGroupRepo
 *
 * Data repository for persisting ProductGroup domain model
 */
@Repository
public interface ProductGroupRepo extends CrudRepository<ProductGroup, Integer> {
    /**
     * Find product group in database with argument group name
     * @param groupName
     * @return
     */
    Optional<ProductGroup> findProductGroupByGroupNameIgnoreCase(String groupName);
}
