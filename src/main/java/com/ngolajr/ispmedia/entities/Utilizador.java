package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.Roles;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.util.Set;

@Entity
@Table(name="user")
@Data
public class Utilizador {
    @Id
    private String username;
    private String password;
    private Set<Roles> roles;

}
