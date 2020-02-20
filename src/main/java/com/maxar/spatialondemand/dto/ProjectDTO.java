package com.maxar.spatialondemand.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * ProjectDTO
 *
 * DTO for Project domain model
 */
@Data
@NoArgsConstructor
public class ProjectDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;
    private String projectTitle;
    private String projectDescription;
    private Timestamp dateCreated;
    private Timestamp lastModified;
    private Date filterAcquisitionRangeFrom;
    private Date filterAcquisitionRangeTo;
    private Short filterResolutionFrom;
    private Short filterResolutionTo;
    private Short filterIncidenceAngleFrom;
    private Short filterIncidenceAngleTo;
    private Short filterCloudCoverFrom;
    private Short filterCloudCoverTo;
    private Short filterSnowCoverFrom;
    private Short filterSnowCoverTo;

    @ToString.Exclude
    private Set<ProductDTO> products = new HashSet<>();
}
