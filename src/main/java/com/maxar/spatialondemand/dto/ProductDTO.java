package com.maxar.spatialondemand.dto;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * ProductDTO
 *
 * DTO for Product domain model
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class ProductDTO {
    private Integer productId;
    private String productGroupName;
    private String productName;
    private String serviceUrl;

    @ToString.Exclude
    private Set<ProjectDTO> projects = new HashSet<>();
}
