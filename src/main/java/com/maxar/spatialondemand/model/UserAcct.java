package com.maxar.spatialondemand.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.*;

/**
 * UserAcct
 *
 * Models and encapsulates user account data used to facilitate web sessions, etc.
 */
@Entity(name = "UserAcct")
@Table(name = "user_accts")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@DynamicUpdate
@DynamicInsert
public class UserAcct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "biz_entity")
    private String bizEntity;

    @Column(name = "is_admin", nullable = false)
    private boolean admin;

    @Column(name = "date_created")
    private Timestamp dateCreated;

    @Column(name = "last_modified")
    private Timestamp lastModified;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @JsonManagedReference
    private List<Role> roles = new ArrayList<>();

    /**
     * Adds arg Role to this UserAcct's list of roles. Keeps UserAcct -> Role relationship
     * in sync.
     * @param role
     */
    public void addRole(Role role) {
        this.roles.add(role);
        role.getUsers().add(this);
    }

    /**
     * Removes arg Role from this UserAcct's list of roles. Keeps UserAcct -> Role relationship
     * in sync.
     * @param role
     */
    public void removeRole(Role role) {
        this.roles.remove(role);
        role.getUsers().remove(this);
    }
}
