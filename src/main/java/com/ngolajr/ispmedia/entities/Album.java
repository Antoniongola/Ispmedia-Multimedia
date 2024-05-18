package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Album extends Conteudo{
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Musica> musics;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Artista artista;
}
