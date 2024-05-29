package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;
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
public class Album extends Conteudo{
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Musica> musics;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Artista artista;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Critica> criticas;
    private Date dataLancamento;
    private double pontuacaoMedia;
    private int streams;
    public Album(){
        super();
        this.streams = 0;
    }
}
