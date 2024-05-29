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
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Artista> artists;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Album album;
    private int duration;
    private String path;
    private Date dataLancamento;
    private int streams;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Genero genero;
    public Musica(){
        super();
        this.streams=0;
    }
}
