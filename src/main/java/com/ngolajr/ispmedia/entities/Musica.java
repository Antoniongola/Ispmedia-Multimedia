package com.ngolajr.ispmedia.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@ToString
@Getter
@Setter
public class Musica extends Conteudo{
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Artista artista;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Artista> artists;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Album album;
    private int duration;
    private String path;
    @Column(length = 20000)
    private String letra;
    private Date dataLancamento;
    private int streams;
    public Musica(){
        super();
        this.streams=0;
    }
}