package com.maxar.spatialondemand.repository;

import com.maxar.spatialondemand.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * ProductRepo
 *
 * Data repository for persisting Product domain model
 */
@Repository
public interface ProductRepo extends CrudRepository<Product, Integer> {

    /**
     * Retrieve a Product instance with argument product name
     * @param productName
     * @return
     */
    Optional<Product> findProductByProductNameIgnoreCase(String productName);

    /**
     * Retrieves a list of Product instances with the argument ProductGroup name
     * @param groupName
     * @return
     */
    List<Product> findProductsByProductGroup_GroupNameIgnoreCase(String groupName);
}
