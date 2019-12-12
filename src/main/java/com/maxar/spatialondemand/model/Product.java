package com.maxar.spatialondemand.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * Product
 *
 * Represents an available GIS product service that can be viewed and/or
 * exported/download.
 */
@Entity(name = "Product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@DynamicUpdate
@DynamicInsert
public class Product {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", updatable = false, nullable = false, unique = true)
    @Setter(AccessLevel.PRIVATE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private ProductGroup productGroup;

    @Column(name = "product_name", nullable = false, unique = true)
    private String productName;

    @Column(name = "service_url", nullable = false)
    private String serviceUrl;
}
