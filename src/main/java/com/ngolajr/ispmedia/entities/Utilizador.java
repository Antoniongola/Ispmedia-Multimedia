package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.Roles;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CurrentTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="user")
@Data
public class Utilizador {
    private String nome;
    @Id
    private String username;
    private String password;
    private Set<Roles> roles;
    @CurrentTimestamp
    @Column(updatable = false)
    private LocalDateTime createdDate;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Playlist> playlists;
}