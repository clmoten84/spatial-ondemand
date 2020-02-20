package com.maxar.spatialondemand.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.*;

/**
 * UserAcctDTO
 *
 * DTO for UserAcct domain model
 */
@Data
@NoArgsConstructor
public class UserAcctDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private UUID id;
    private String username;
    private String password;
    private String email;
    private String name;
    private String bizEntity;
    private boolean admin;
    private Timestamp dateCreated;
    private Timestamp lastModified;

    @ToString.Exclude
    private List<RoleDTO> roles = new ArrayList<>();
}
