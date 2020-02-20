package com.maxar.spatialondemand.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.*;

@Entity(name = "Role")
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    @Column(name = "role_name", nullable = false, unique = true)
    private String roleName;

    @Column(name = "date_created", nullable = false)
    private Timestamp dateCreated;

    @Column(name = "last_modified", nullable = false)
    private Timestamp lastModified;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    @JsonBackReference
    @ToString.Exclude
    private List<UserAcct> users = new ArrayList<>();
}
