package com.maxar.spatialondemand.controllers.rest;

import com.maxar.spatialondemand.dto.ProductDTO;
import com.maxar.spatialondemand.dto.ProductGroupDTO;
import com.maxar.spatialondemand.service.ProductGroupService;
import com.maxar.spatialondemand.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ProductRestController {

    private ProductGroupService productGroupService;
    private ProductService productService;

    @Autowired
    public ProductRestController(ProductGroupService productGroupService, ProductService productService) {
        this.productGroupService = productGroupService;
        this.productService = productService;
    }

    /**
     * Saves a new ProductGroup instance to the database
     * @param productGroupDTO
     * @return
     */
    @PostMapping(value = "/productGroups",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ProductGroupDTO saveProductGroup(@RequestBody ProductGroupDTO productGroupDTO) {
        return productGroupService.save(productGroupDTO);
    }

    /**
     * Updates an existing ProductGroup instance to the database
     * @return
     */
    @PutMapping(value = "/productGroups",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ProductGroupDTO updateProductGroup(@RequestBody ProductGroupDTO productGroupDTO) {
        return productGroupService.update(productGroupDTO);
    }

    /**
     * Delete an existing ProductGroup instance from the database
     * @param productGroupId
     */
    @DeleteMapping(value = "/productGroups/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteProductGroup(@PathVariable("id") Integer productGroupId) {
        productGroupService.delete(productGroupId);
    }

    /**
     * Fetch a ProductGroup instance using argument product group id
     * @param productGroupId
     * @return
     */
    @GetMapping(value = "/productGroups/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ProductGroupDTO fetchProductGroupById(@PathVariable("id") Integer productGroupId) {
        return productGroupService.findByGroupId(productGroupId);
    }

    /**
     * Fetch a ProductGroup instance using argument product group name
     * @param productGroupName
     * @return
     */
    @GetMapping(value = "/productGroups",
            params = "name",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ProductGroupDTO fetchProductGroupByName(@RequestParam("name") String productGroupName) {
        return productGroupService.findByGroupName(productGroupName);
    }

    /**
     * Fetch all ProductGroup instances
     * @return
     */
    @GetMapping(value = "/productGroups",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<ProductGroupDTO> fetchAllProductGroups() {
        return productGroupService.getAllGroups();
    }

    /**
     * Save a new or update an existing Product instance
     * @param productDTO
     * @return
     */
    @PostMapping(value = "/products",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ProductDTO saveProduct(@RequestBody ProductDTO productDTO) {
        return productService.save(productDTO);
    }

    @PutMapping(value = "/products",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ProductDTO updateProduct(@RequestBody ProductDTO productDTO) {
        return productService.update(productDTO);
    }

    /**
     * Delete an existing Product instance
     * @param productId
     */
    @DeleteMapping(value = "/products/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteProduct(@PathVariable("id") Integer productId) {
        productService.deleteById(productId);
    }

    /**
     * Fetch a Product instance using argument product id
     * @param productId
     * @return
     */
    @GetMapping(value = "/products/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ProductDTO fetchProductById(@PathVariable("id") Integer productId) {
        return productService.findByProductId(productId);
    }

    /**
     * Fetch a Product instance using argument product name
     * @param productName
     * @return
     */
    @GetMapping(value = "/products",
            params = "name",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<ProductDTO> fetchProductsByName(@RequestParam("name") String productName) {
        return productService.findByProductName(productName);
    }

    /**
     * Fetch a Product instance using argument product group name
     * @param productGroupName
     * @return
     */
    @GetMapping(value = "/products",
            params = "groupName",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<ProductDTO> fetchProductsByGroup(@RequestParam("groupName") String productGroupName) {
        return productService.findProductsByGroup(productGroupName);
    }

    /**
     * Fetch a list of Product instances using argument project id
     * @param projectId
     * @return
     */
    @GetMapping(value = "/products",
            params = "projectId",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<ProductDTO> fetchProductsByProject(@RequestParam("projectId") Integer projectId) {
        return productService.findProductsByProjectId(projectId);
    }

    /**
     * Fetch all Product instances
     * @return
     */
    @GetMapping(value = "/products",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<ProductDTO> fetchAllProducts() {
        return productService.getAllProducts();
    }
}
