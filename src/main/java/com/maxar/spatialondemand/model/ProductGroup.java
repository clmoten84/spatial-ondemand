package com.maxar.spatialondemand.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(
            mappedBy = "productGroup",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @Setter(AccessLevel.PRIVATE)
    @JsonManagedReference
    private List<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        products.add(product);
        product.setProductGroup(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.setProductGroup(null);
    }
}
