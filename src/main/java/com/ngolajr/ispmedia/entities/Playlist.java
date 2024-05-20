package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String titulo;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Musica> lista;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Utilizador owner;
}
