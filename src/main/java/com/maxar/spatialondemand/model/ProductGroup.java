package com.maxar.spatialondemand.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * ProductGroup
 *
 * Represents a grouping construct under which GIS product services reside. Allows
 * for filtering exportable/downloadable products.
 */
@Entity(name = "Product_Group")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@DynamicUpdate
@DynamicInsert
public class ProductGroup {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", updatable = false, nullable = false, unique = true)
    @Setter(AccessLevel.PRIVATE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer groupId;

    @Column(name = "group_name", nullable = false, unique = true)
    private String groupName;
}
