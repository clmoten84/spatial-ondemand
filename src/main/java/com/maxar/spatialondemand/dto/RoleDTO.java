package com.maxar.spatialondemand.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.*;

/**
 * RoleDTO
 *
 * DTO for Role domain model
 */
@Data
@NoArgsConstructor
public class RoleDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private UUID id;
    private String roleName;
    private Timestamp dateCreated;
    private Timestamp lastModified;

    @ToString.Exclude
    private List<UserAcctDTO> users = new ArrayList<>();
}
