package com.maxar.spatialondemand.dto;

import com.maxar.spatialondemand.model.Product;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * ProductGroupDTO
 *
 * DTO for ProductGroup domain model
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class ProductGroupDTO {
    private Integer groupId;
    private String groupName;

    @ToString.Exclude
    private List<ProductDTO> products = new ArrayList<>();
}
