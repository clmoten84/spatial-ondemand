package com.maxar.spatialondemand.dto;

import lombok.*;

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
}
