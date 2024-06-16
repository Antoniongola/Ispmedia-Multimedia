package com.ngolajr.ispmedia.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@ToString
@Getter
@Setter
public class Musica extends Conteudo{
    //@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @ManyToOne
    @JsonBackReference(value = "artista-musica")
    private Artista artista;
    @ManyToMany()
    private List<Artista> artists = new ArrayList<>();
    @ManyToOne()
    @JsonBackReference(value = "album-musica")
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