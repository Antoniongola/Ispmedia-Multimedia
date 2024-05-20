package com.ngolajr.ispmedia.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.UUID;

@Entity
@ToString
@Getter
@Setter
public class Musica extends Conteudo{
    @ManyToMany
    private List<Artista> artists;
    @ManyToOne
    private Album album;
    private int duration;
    private String path;
}
