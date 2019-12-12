package com.maxar.spatialondemand.dto;

import lombok.*;

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
}
