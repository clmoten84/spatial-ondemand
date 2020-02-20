package com.maxar.spatialondemand.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * Project
 *
 * Models a project construct that is used to encapsulate and persist data export criteria. Projects can
 * be shared to other app users and can be used to recall prior export operations and their criteria.
 */
@Entity(name = "Project")
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@DynamicUpdate
@DynamicInsert
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    @Setter(AccessLevel.PRIVATE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String projectTitle;

    @Column(name = "description")
    private String projectDescription;

    @Column(name = "date_created")
    private Timestamp dateCreated;

    @Column(name = "last_modified")
    private Timestamp lastModified;

    @Column(name = "filter_acquisition_range_from")
    private Date filterAcquisitionRangeFrom;

    @Column(name = "filter_acquisition_range_to")
    private Date filterAcquisitionRangeTo;

    @Column(name = "filter_resolution_from")
    private Short filterResolutionFrom;

    @Column(name = "filter_resolution_to")
    private Short filterResolutionTo;

    @Column(name = "filter_incidence_angle_from")
    private Short filterIncidenceAngleFrom;

    @Column(name = "filter_incidence_angle_to")
    private Short filterIncidenceAngleTo;

    @Column(name = "filter_cloud_cover_from")
    private Short filterCloudCoverFrom;

    @Column(name = "filter_cloud_cover_to")
    private Short filterCloudCoverTo;

    @Column(name = "filter_snow_cover_from")
    private Short filterSnowCoverFrom;

    @Column(name = "filter_snow_cover_to")
    private Short filterSnowCoverTo;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "project_product", joinColumns = @JoinColumn(name = "project_id"),
                inverseJoinColumns = @JoinColumn(name = "product_id"))
    @ToString.Exclude
    private Set<Product> products = new HashSet<>();

    // Define add and remove product methods to keep many to many relationship in sync. Since this is
    // the owner side of the relationship, it has the responsibility of keeping the relation in sync.
    public void addProduct(Product product) {
        products.add(product);
        product.getProjects().add(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.getProjects().remove(this);
    }
}
