package com.maxar.spatialondemand.repository;

import com.maxar.spatialondemand.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
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
    List<Product> findProductByProductNameIgnoreCase(String productName);

    /**
     * Retrieves a list of Product instances with the argument ProductGroup name
     * @param groupName
     * @return
     */
    List<Product> findProductsByProductGroup_GroupNameIgnoreCase(String groupName);

    /**
     * Retrieves a list of Product instances with ids in the argument list of ids
     * @param productIds
     * @return
     */
    List<Product> findProductsByProductIdIn(List<Integer> productIds);

    /**
     * Retrieves a list of Product instances associated with Project instance with arg project id
     * @param projectId
     * @return
     */
    @Query("select prj.products from Project prj where prj.id = :projectId")
    List<Product> findProductsByProjectId(@Param("projectId") Integer projectId);
}
