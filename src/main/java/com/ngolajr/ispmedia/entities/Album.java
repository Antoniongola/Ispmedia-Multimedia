package com.ngolajr.ispmedia.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Musica> musics;
    //@ManyToOne(fetch = FetchType.EAGER ,cascade = CascadeType.ALL)
    @JsonBackReference(value = "artista-album")
    @ManyToOne
    private Artista artista;
    @OneToMany
    private List<Critica> criticas;
    private Date dataLancamento;
    private double pontuacaoMedia;
    private int streams;
    public Album(){
        super();
        this.streams = 0;
    }
}
