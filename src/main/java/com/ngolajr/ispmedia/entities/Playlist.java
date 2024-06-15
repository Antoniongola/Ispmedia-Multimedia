package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.Privacidade;
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
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Musica> musicas;
    @ManyToOne(fetch = FetchType.EAGER)
    private Utilizador owner;
    private Privacidade privacidade;
}
