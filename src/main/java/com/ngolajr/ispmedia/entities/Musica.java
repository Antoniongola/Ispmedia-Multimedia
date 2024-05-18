package com.ngolajr.ispmedia.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Entity
public class Musica extends Conteudo{
    @ManyToMany
    private List<Artista> artists;
    @OneToOne
    private Album album;
    private int duration;
}
